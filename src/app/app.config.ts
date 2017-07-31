import { OpaqueToken } from '@angular/core';
import { environment } from '../environments/environment';

interface AppConfig {
  tokenKey?: string;
  baseApiUrl?: string;
}

const DEFAULT_APP_CONFIG: AppConfig = {
  tokenKey: 'id_token',
  baseApiUrl: environment.baseApiUrl
};

const APP_CONFIG = new OpaqueToken('app.config');

export { AppConfig, DEFAULT_APP_CONFIG, APP_CONFIG };
