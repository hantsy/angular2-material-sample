import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  username: FormControl;
  password: FormControl;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _loadingService: TdLoadingService
  ) {

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);

    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]);

    this.signupForm = fb.group({
      email: this.email,
      username: this.username,
      password: this.password
    });

  }

  signup(): void {
    this._loadingService.register();
    console.log('singup in with ' + this.username + ':' + this.password + ':' + this.email);
    setTimeout(() => {
      this._router.navigate(['/']);
      this._loadingService.resolve();
    }, 2000);
  }

  ngOnInit() {
    console.log('ngOnInit...');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy...');
  }

}
