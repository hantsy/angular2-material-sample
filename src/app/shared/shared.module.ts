import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ShowAuthedDirective } from './show-authed.directive';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ShowAuthedDirective,
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ShowAuthedDirective,
    NavbarComponent,
    FooterComponent
  ],
})
export class SharedModule { }
