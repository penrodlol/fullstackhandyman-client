import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { CookieMap } from '../models/cookie-map.model';
import { UrlBuilderService } from 'src/app/shared/url/url-builder.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookieMapsService {
  cookieUrl: string;

  private cookieMapsSource: BehaviorSubject<CookieMap[]> = new BehaviorSubject([]);
  currentCookieMapsContainers: Observable<CookieMap[]> = from(this.cookieMapsSource);

  constructor(private urlBuilderService: UrlBuilderService, private http: HttpClient) {
    this.cookieUrl = this.urlBuilderService.buildUrl('cookie');
  }

  getMaps(containerNum: number): void {
    const url = `${this.cookieUrl}/maps`;
    this.http.get<CookieMap[]>(url, {
      headers: new HttpHeaders({
        containerNum: containerNum.toString(),
      })
    }).subscribe(cookieMaps => {
      this.cookieMapsSource.next(cookieMaps);
    });
  }
}