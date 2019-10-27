import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  cookieData: any;

  constructor() { }

  ngOnInit() {
  }

  fetchCookieData(cookieData: any) {
    this.cookieData = cookieData;
  }

}
