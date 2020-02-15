import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CookieContextService } from './service/cookie-context.service';
import { Observable } from 'rxjs';
import { CookieContext } from '../models/cookie-context.model';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';

@Component({
  selector: 'cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnChanges {
  @Input() cookieMapsContainer: CookieMapsContainers;
  @Output() removedCookieMapsContainer: EventEmitter<CookieMapsContainers> = new EventEmitter();

  cookieContext: Observable<CookieContext> = this.cookieContextService.currentCookieContext;

  constructor(private cookieContextService: CookieContextService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.cookieContextService.getCookie(this.cookieMapsContainer);
  }

  getRemovedCookie(removedCookieMapsContainer: CookieMapsContainers) {
    this.cookieContextService.resetCookie();
    this.removedCookieMapsContainer.emit(removedCookieMapsContainer);
  }
}
