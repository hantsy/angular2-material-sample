import { OpaqueToken } from '@angular/core';
import { environment } from '../environments/environment';

export interface AppConfig {
  tokenKey?: string;
  baseApiUrl?: string;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  tokenKey: 'id_token',
  baseApiUrl: environment.baseApiUrl
};

export let APP_CONFIG = new OpaqueToken('app.config');

