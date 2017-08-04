import { AuthService } from './../core/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  username: string;
  password: string;

  constructor(
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _auth: AuthService
  ) {

  }

  login(): void {
    // this._loadingService.register();
    console.log('logged in with ' + this.username + ':' + this.password);
    // setTimeout(() => {
    //   this._router.navigate(['/']);
    //   this._loadingService.resolve();
    // }, 2000);

    this._auth.attempAuth('signin', {
      username: this.username,
      password: this.password
    })
  }

  ngOnInit() {
    console.log('initializing SigninComponent...');
  }

  ngOnDestroy() {
    console.log('destroying SignComponent...');
  }
}
