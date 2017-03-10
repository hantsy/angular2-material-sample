import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    console.log('calling onLogout...');
    this.authService.logout();
  }
}


