import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap, takeUntil} from 'rxjs/operators';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';
import { UrlBuilderService } from 'src/app/shared/url/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService {
  cookieUrl: string;

  private currentCookieMapsContainers: Observable<CookieMapsContainers[]>;

  constructor(private urlBuilderService: UrlBuilderService, private http: HttpClient) {
    this.cookieUrl = this.urlBuilderService.buildUrl('cookie');
  }

  get cookieMapsContainers() {
    return !this.currentCookieMapsContainers
    ? this.getCookieMapsContainers().pipe(shareReplay(1))
    : this.currentCookieMapsContainers;
  }
  
  private getCookieMapsContainers(): Observable<CookieMapsContainers[]> {
    const url = `${this.cookieUrl}/containers`;
    return this.http.get<CookieMapsContainers[]>(url);
  }

  createContainer(containerName: string): Observable<CookieMapsContainers> {
    const url = `${this.cookieUrl}/create/container`;
    return this.http.post<any>(url, null, {
      headers: new HttpHeaders({
        name: containerName
      })
    });
  }
}
