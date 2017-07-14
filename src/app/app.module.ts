import { BaseUrlInterceptor } from './core/base-url-interceptor';
import { AuthHttpInterceptor } from './core/auth-http-interceptor';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

    // custom module for views
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'unicorn-dark-theme';
  }
}
