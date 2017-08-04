import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import { HttpInterceptorService } from '@covalent/http';

import { JWT } from './jwt';
import { User } from './user.model';
// import { APP_CONFIG, AppConfig } from '../app.config';
import { ApiService } from './api.service';


// export interface State {
//   items: Items[]
// }

// const defaultState = {
//   items: []
// };

// const DEFAUTL_STORE = new BehaviorSubject<State>(defaultState);

// @Injectable()
// export class Store {
//   private _store = DEFAUTL_STORE;
//   changes = _store.distinctUntilChanged()
//     .do(() => console.log('changes'));

//   setState(state: State) {
//     this._store.next(state);
//   }

//   getState(): State {
//     return this._store.value;
//   }

//   purge() {
//     this._store.next(defaultState);
//   }
// }

@Injectable()
export class AuthService {

  private currentUserState: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private authenticatedState: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private desiredUrl: string = null;

  constructor(
    // @Inject(APP_CONFIG) private config: AppConfig,
    private api: ApiService,
    private jwt: JWT,
    private router: Router) {
  }

  attempAuth(type: string, credentials: any) {
    const path = (type === 'signin') ? '/signin' : '/signup';
    const url = '/auth' + path;

    this.api.post(url, credentials)
      // .map(res => res.json())
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

    if (this.jwt.get()) {
      this.api.get('/user').subscribe(
        res => {
          this.currentUserState.next(res);
          this.authenticatedState.next(true);
        },
        err => {
          this.jwt.destroy();
          this.currentUserState.next(null);
          this.authenticatedState.next(false);
        }
      );
    } else {
      // token is not found in local storage.
      this.jwt.destroy();
      this.currentUserState.next(null);
      this.authenticatedState.next(false);
    }
  }

  signout() {
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
