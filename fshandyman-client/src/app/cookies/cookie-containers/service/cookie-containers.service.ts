import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from, } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';
import { UrlBuilderService } from 'src/app/shared/url/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService {
  cookieUrl: string;

  private cookieMapsContainersSource: BehaviorSubject<CookieMapsContainers[]> = new BehaviorSubject([]);
  currentCookieMapsContainers: Observable<CookieMapsContainers[]> = from(this.cookieMapsContainersSource);

  constructor(private urlBuilderService: UrlBuilderService, private http: HttpClient) {
    this.cookieUrl = this.urlBuilderService.buildUrl('cookie');
  }
  
  getCookieMapsContainers(): void {
    const url = `${this.cookieUrl}/containers`;
    this.http.get<CookieMapsContainers[]>(url).subscribe(cookieMapsContainers => {
      this.cookieMapsContainersSource.next(cookieMapsContainers);
    });
  }

  refreshCookieMapsContainers(cookieMapsContainer: CookieMapsContainers) {
    const currentCookieMapsContainers = this.cookieMapsContainersSource.getValue();
    const newCookieMapsContainers = [ ...currentCookieMapsContainers, cookieMapsContainer];
    this.cookieMapsContainersSource.next(newCookieMapsContainers);
  }

  createContainer(containerName: string, containerTag: string): Observable<CookieMapsContainers> {
    const url = `${this.cookieUrl}/create/container`;
    return this.http.post<any>(url, null, {
      headers: new HttpHeaders({
        name: containerName,
        tag: containerTag
      })
    });
  }
}
