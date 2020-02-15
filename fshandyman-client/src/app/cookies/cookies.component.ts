import { Component, OnInit } from '@angular/core';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  cookieMapsContainer: CookieMapsContainers;
  cookieMapsContainerToRemove: CookieMapsContainers;
  isSelected: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getCookieMapsContainer(cookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainer = cookieMapsContainer;
    this.isSelected = true;
  }

  getRemovedCookieMapsContainer(removedCookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainerToRemove = removedCookieMapsContainer;
  }
}
