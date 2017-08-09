import { Component, Input, OnInit , AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
    private translate: TranslateService,
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
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');

    this.translate.use('en');

    // console.log('posts of lang:' + this.translate.instant('posts'));
    // console.log('posts nonexist of lang:' + this.translate.instant('posts-nonexist'));
  }

  ngOnInit() {
    this._auth.verifyAuth();
  }

  signout() {
    this._auth.signout();
  }


}
