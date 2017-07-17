import { Injectable, Inject } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { IHttpInterceptor } from '@covalent/http';
import { Router } from '@angular/router';
import { JWT } from './jwt';
import { APP_CONFIG, AppConfig } from '../app.config';

const XAUTH_TOKEN_KEY = 'X-Auth-Token';

@Injectable()
export class AuthHttpInterceptor implements IHttpInterceptor {

  constructor(
    // @Inject(APP_CONFIG) config: AppConfig,
    private _jwt: JWT,
    private _router: Router
  ) { }

  onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    console.log('AuthHttpInterceptor::onRequest::' + requestOptions);

    const token = this._jwt.get();
    if (token) {
      console.log('restoring token from local storage...::' + token);
      requestOptions.headers.append(XAUTH_TOKEN_KEY, token);
    }
    return requestOptions;
  }

  onRequestError(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    console.log('AuthHttpInterceptor::onRequestError::' + requestOptions);
    return requestOptions;
  }

  onResponse(response: Response): Response {
    console.log('AuthHttpInterceptor::onResponse::' + response);
    const token = response.headers.get(XAUTH_TOKEN_KEY);

    if (token !== undefined && token.length > 0) {
      console.log('saving token to local storage...::' + token);
      this._jwt.save(token);
    }

    return response;
  }

  onResponseError(response: Response): Response {
    console.log('AuthHttpInterceptor::onResponseError::' + response);
    if (response.status === 401) {
      this._router.navigateByUrl('/auth/signin');
      return null;
    }
    return response;
  }
}

