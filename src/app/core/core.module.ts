import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor } from './auth-http-interceptor';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JWT } from './jwt';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    // HttpModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthHttpInterceptor,
    AuthService,
    JWT,
    AuthGuard
  ],
  declarations: []
})
export class CoreModule {

  // Prevent reimport of the CoreModule
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
