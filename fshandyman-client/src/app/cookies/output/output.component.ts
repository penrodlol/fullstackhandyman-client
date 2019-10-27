import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CookieModel } from '../models/cookie.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit, OnChanges {
  @Input() cookieData: any;

  cookieTable: CookieModel[] = [];
  displayedColumns: string[];

  constructor() { }

  ngOnInit() {
    this.displayedColumns = ['name', 'value'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentCookieData = changes.cookieData.currentValue;
    if (!this.isCookieTableEmpty(currentCookieData)) {
      const newCookies = [];
      Object.entries(currentCookieData).forEach((data: any) => {
        const cookieModel: CookieModel = new CookieModel();
        cookieModel.name = data[0];
        cookieModel.value = data[1];
        newCookies.push(cookieModel);
      });
      this.cookieTable = newCookies;
    }
  }

  isCookieTableEmpty(cookieData: any) {
    return !this.cookieData ? true : false;
  }

}
