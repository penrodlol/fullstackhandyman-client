import { Component, OnInit } from '@angular/core';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  cookieRoutes: ROUTE[] = [
    {
      icon: '../../../assets/cookie.png',
      route: 'handy-cookies',
      title: 'Cookies'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
