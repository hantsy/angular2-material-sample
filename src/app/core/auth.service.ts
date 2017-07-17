import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import { HttpInterceptorService } from '@covalent/http';

import { JWT } from './jwt';
import { User } from './user.model';
import { APP_CONFIG, AppConfig } from '../app.config';


@Injectable()
export class AuthService {

  private currentUserState: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private authenticatedState: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private desiredUrl: string = null;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private api: HttpInterceptorService,
    private jwt: JWT,
    private router: Router) {
  }

  attempAuth(type: string, credentials: any) {
    const path = (type === 'signin') ? '/signin' : '/signup';
    const url = this.config.baseApiUrl + '/auth' + path;

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
      this.api.get(this.config.baseApiUrl + '/user').subscribe(
        res => {
          this.currentUserState.next(res.json());
          this.authenticatedState.next(true);
        },
        err => {
          this.jwt.destroy();
          this.currentUserState.next(null);
          this.authenticatedState.next(false);
        }
      );
    } else {
      this.jwt.destroy();
      this.currentUserState.next(null);
      this.authenticatedState.next(false);
    }
  }

  logout() {
    // reset the initial values
    this.setState(null);
    // this.desiredUrl = null;

    this.jwt.destroy();
    this.desiredUrl = null;

    this.router.navigate(['']);
  }

  currentUser(): Observable<User> {
    return this.currentUserState.distinctUntilChanged();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticatedState.asObservable();
  }

  getDesiredUrl() {
    return this.desiredUrl;
  }

  setDesiredUrl(url: string) {
    this.desiredUrl = url;
  }

  private setState(state: User) {
    if (state) {
      this.currentUserState.next(state);
      this.authenticatedState.next(true);
    } else {
      this.currentUserState.next(null);
      this.authenticatedState.next(false);
    }
  }

}
