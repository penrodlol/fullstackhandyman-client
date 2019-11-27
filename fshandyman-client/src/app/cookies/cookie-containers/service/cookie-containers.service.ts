import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService {

  private _cookieMapsContainers: Observable<CookieMapsContainers>;

  constructor(@Inject('API_BASE_URL') private baseUrl: string, private http: HttpClient) { }

  get cookieMapsContainers(): Observable<CookieMapsContainers> {
    return !this._cookieMapsContainers
    ? this._cookieMapsContainers = this.getCookieMapsContainers().pipe(shareReplay(1))
    : this._cookieMapsContainers;
  }

  private getCookieMapsContainers(): Observable<CookieMapsContainers> {
    const url = `${this.baseUrl}/com/fullstackhandyman/api/cookie/container`;
    return this.http.get<CookieMapsContainers>(url);
  }
}
