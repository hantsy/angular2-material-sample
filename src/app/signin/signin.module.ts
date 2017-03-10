import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SigninRoutingModule,
    SharedModule
  ],
  declarations: [SigninComponent]
})
export class SigninModule { }
