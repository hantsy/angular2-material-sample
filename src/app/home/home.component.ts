
import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  routes: Object[] = [
    {
      title: 'Home',
      route: '/',
      icon: 'home',
    }, {
      title: 'Technology',
      route: '/',
      icon: 'laptop_mac',
    }, {
      title: 'Locations',
      route: '/',
      icon: 'language',
    }, {
      title: 'Job Openings',
      route: '/',
      icon: 'assignment',
    }, {
      title: 'Leadership',
      route: '/',
      icon: 'people',
    },
  ];

  constructor(
    private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _auth: AuthService
  ) {
    this._iconRegistry
      .addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer
        .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/teradata-ux.svg')
      );

    this._iconRegistry
      .addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer
        .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg')
      );

    this._iconRegistry
      .addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer
        .bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent-mark.svg')
      );

  }
  ngAfterViewInit(): void {

  }

  signout() {
    this._auth.signout();
  }
}
