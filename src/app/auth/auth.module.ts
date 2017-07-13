import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [SigninComponent, SignupComponent, AuthComponent]
})
export class AuthModule { }
