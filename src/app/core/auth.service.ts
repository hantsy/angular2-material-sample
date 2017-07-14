import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import { HttpInterceptorService } from '@covalent/http';

import { JWT } from './jwt';
import { User } from './user.model';


@Injectable()
export class AuthService {

  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private authenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private desiredUrl: string = null;

  constructor(
    private api: HttpInterceptorService,
    private jwt: JWT,
    private router: Router) {
  }

  attempAuth(type: string, credentials: any) {
    const path = (type === 'signin') ? '/signin' : '/signup';
    const url = '/auth' + path;

    this.api.post(url, credentials)
      .map(res => res.json())
      .subscribe(res => {

        this.setState(res);

        if (this.desiredUrl && !this.desiredUrl.startsWith('/auth/signin')) {
          const _targetUrl = this.desiredUrl;
          this.desiredUrl = null;
          this.router.navigateByUrl(_targetUrl);
        } else {
          this.router.navigate(['']);
        }
      });
  }


  verifyAuth(): void {

    // jwt token is not found in local storage.
    if (this.jwt.get()) {
      this.api.get('/user').subscribe(
        res => {
          this.currentUser$.next(res.json());
          this.authenticated$.next(true);
        },
        err => {
          this.jwt.destroy();
          this.currentUser$.next(null);
          this.authenticated$.next(false);
        }
      );
    } else {
      this.jwt.destroy();
      this.currentUser$.next(null);
      this.authenticated$.next(false);
    }
  }

  logout() {
    // reset the initial values
    this.setState(null);
    //this.desiredUrl = null;

    this.jwt.destroy();
    this.desiredUrl = null;

    this.router.navigate(['']);
  }

  currentUser(): Observable<User> {
    return this.currentUser$.distinctUntilChanged();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  getDesiredUrl() {
    return this.desiredUrl;
  }

  setDesiredUrl(url: string) {
    this.desiredUrl = url;
  }

  private setState(state: User) {
    if (state) {
      this.currentUser$.next(state);
      this.authenticated$.next(true);
    } else {
      this.currentUser$.next(null);
      this.authenticated$.next(false);
    }
  }

}
