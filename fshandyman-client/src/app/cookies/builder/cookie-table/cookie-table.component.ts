import { Component, OnInit } from '@angular/core';
import { CookieModel } from '../cookie.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-table',
  templateUrl: './cookie-table.component.html',
  styleUrls: ['./cookie-table.component.scss']
})
export class CookieTableComponent implements OnInit {

  cookieTable: CookieModel[];
  cookieModel: CookieModel;
  displayedColumns: string[];

  constructor() { }

  ngOnInit() {
    this.cookieModel = new CookieModel();
    this.cookieModel.name = 'Test Name';
    this.cookieModel.value = 'Test Value';
    this.displayedColumns = ['name', 'value'];
    this.cookieTable = this.initCookieTable();
  }

  initCookieTable = (): CookieModel[] => [
    this.cookieModel
  ]

}
