import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { CookieContext } from '../../models/cookie-context.model';
import { CookieMapsContainers } from '../../models/cookie-maps-containers.model';

@Injectable({
  providedIn: 'root'
})
export class CookieContextService implements OnDestroy {
  private cookieContextSource: BehaviorSubject<CookieContext> = new BehaviorSubject(new CookieContext());
  currentCookieContext: Observable<CookieContext> = from(this.cookieContextSource);

  ngOnDestroy = () => this.cookieContextSource.unsubscribe();

  getCookie(cookieMapsContainer: CookieMapsContainers) {
    let cookieContext: CookieContext = new CookieContext();
    cookieContext.setCookieMapsContainer(cookieMapsContainer);
    this.cookieContextSource.next(cookieContext);
  }

  resetCookie = () => this.cookieContextSource.next(null);
}
