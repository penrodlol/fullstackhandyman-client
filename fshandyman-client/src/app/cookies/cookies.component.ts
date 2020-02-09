import { Component, OnInit } from '@angular/core';
import { CookieMapsContainers } from './cookie-containers/models/cookie-maps-containers.model';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  cookieMapsContainer: CookieMapsContainers;

  constructor() { }

  ngOnInit() {
  }

  getCookieMapsContainer(cookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainer = cookieMapsContainer;
  }
}
