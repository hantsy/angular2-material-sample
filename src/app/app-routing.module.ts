import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
  // { path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
