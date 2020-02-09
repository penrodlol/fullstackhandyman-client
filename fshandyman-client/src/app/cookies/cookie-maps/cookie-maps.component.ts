import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CookieMapsService } from './service/cookie-maps.service';
import { Observable } from 'rxjs';
import { CookieMap } from './models/cookie-map.model';

@Component({
  selector: 'cookie-maps',
  templateUrl: './cookie-maps.component.html',
  styleUrls: ['./cookie-maps.component.scss']
})
export class CookieMapsComponent implements OnChanges {
  @Input() containerNum: number;
  doesContainerHaveMaps: Boolean;

  cookieMaps: Observable<CookieMap[]> = this.cookieMapsService.currentCookieMapsContainers;

  constructor(
    private cookieMapsService: CookieMapsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const currentContainerNum: number = changes.containerNum.currentValue;
    this.cookieMapsService.getMaps(currentContainerNum);
    this.cookieMaps.subscribe(maps => this.doesContainerHaveMaps = maps.length > 0 ? true : false);
  }
}