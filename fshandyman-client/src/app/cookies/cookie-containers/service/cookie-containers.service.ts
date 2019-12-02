import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap, takeUntil} from 'rxjs/operators';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService {
  cookieUrl = '/com/fullstackhandyman/api/cookie';

  private currentCookieMapsContainers: Observable<CookieMapsContainers[]>;

  constructor(@Inject('API_BASE_URL') private baseUrl: string, private http: HttpClient) { }

  get cookieMapsContainers() {
    return !this.currentCookieMapsContainers
    ? this.getCookieMapsContainers().pipe(shareReplay(1))
    : this.currentCookieMapsContainers;
  }
  
  private getCookieMapsContainers(): Observable<CookieMapsContainers[]> {
    const url = `${this.baseUrl}/${this.cookieUrl}/containers`;
    return this.http.get<CookieMapsContainers[]>(url);
  }

  createContainer(containerName: string): Observable<CookieMapsContainers> {
    const url = `${this.baseUrl}/com/fullstackhandyman/api/cookie/create/container`;
    return this.http.post<any>(url, null, {
      headers: new HttpHeaders({
        name: containerName
      })
    });
  }
}
