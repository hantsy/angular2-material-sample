import { BaseUrlInterceptor } from './core/base-url-interceptor';
import { AuthHttpInterceptor } from './core/auth-http-interceptor';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { OverlayContainer } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  CovalentLayoutModule,
  CovalentStepsModule /*, any other modules */
} from '@covalent/core';
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';

import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from './app.config';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return '[' + params.key + ']';
  }
}
// (optional) Additional Covalent Modules imports
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,

    // Covalent
    CovalentHttpModule.forRoot({
      interceptors: [
        {
          interceptor: BaseUrlInterceptor,
          paths: ['**'],
        },
        {
          interceptor: AuthHttpInterceptor,
          paths: ['**'],
        }
      ],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // custom module for views
    HomeModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: DEFAULT_APP_CONFIG
    },
    {
      provide: MissingTranslationHandler,
      useClass: MyMissingTranslationHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'unicorn-dark-theme';
  }
}
