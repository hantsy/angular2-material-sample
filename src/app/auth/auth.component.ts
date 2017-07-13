import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  navLinks = [
    {
      label: 'SIGN IN', value: '/auth/signin'
    },
    {
      label: 'SIGN UP', value: '/auth/signup'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
