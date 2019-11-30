import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, switchMapTo, switchMap, takeUntil } from 'rxjs/operators';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService {

  private cookieMapsContainers$: Observable<CookieMapsContainers[]>;
  private reload$ = new Subject<void>();

  constructor(@Inject('API_BASE_URL') private baseUrl: string, private http: HttpClient) { }

  get cookieMapsContainers(): Observable<CookieMapsContainers[]> {
    return !this.cookieMapsContainers$
    ? this.cookieMapsContainers$ = this.getCookieMapsContainers().pipe(
      takeUntil(this.reload$),
      shareReplay(1)
    )
    : this.cookieMapsContainers$;
  }

  reloadCookieMapsContainers() {
    this.reload$.next();
    this.cookieMapsContainers$ = null;
  }

  private getCookieMapsContainers(): Observable<CookieMapsContainers[]> {
    const url = `${this.baseUrl}/com/fullstackhandyman/api/cookie/containers`;
    return this.http.get<CookieMapsContainers[]>(url);
  }

  createContainer(containerName: string): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      name: containerName
    });
    const url = `${this.baseUrl}/com/fullstackhandyman/api/cookie/create/container`;
    return this.http.post<any>(url, null, {
      headers: httpHeaders,
      observe: 'response'
    });
    return null;
  }
}
