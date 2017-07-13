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
    private _loadingService: TdLoadingService
  ) {

  }

  login(): void {
    this._loadingService.register();
    alert('logged in with ' + this.username + ':' + this.password);
    setTimeout(() => {
      this._router.navigate(['/']);
      this._loadingService.resolve();
    }, 2000);
  }

  ngOnInit() {
    console.log('initializing SigninComponent...');
  }

  ngOnDestroy() {
    console.log('destroying SignComponent...');
  }
}
