import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieMapsContainers } from '../../models/cookie-maps-containers.model';
import { UrlBuilderService } from 'src/app/shared/url/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService {
  cookieUrl: string;

  constructor(private urlBuilderService: UrlBuilderService, private http: HttpClient) {
    this.cookieUrl = this.urlBuilderService.buildUrl('cookie');
  }
    
  getContainers(): Observable<CookieMapsContainers[]>  {
    const url = `${this.cookieUrl}/containers`;
    return this.http.get<CookieMapsContainers[]>(url);
  }

  createContainer(containerName: string, containerTag: string): Observable<CookieMapsContainers> {
    const url = `${this.cookieUrl}/create/container`;
    return this.http.post<CookieMapsContainers>(url, null, {
      headers: new HttpHeaders({
        name: containerName,
        tag: containerTag
      })
    });
  }

  editContainer(cookieMapsContainer: CookieMapsContainers): Observable<CookieMapsContainers> {
    const url = `${this.cookieUrl}/edit/container`;
    return this.http.put<CookieMapsContainers>(url, cookieMapsContainer);
  }

  removeContainer(containerNum: number) {
    const url = `${this.cookieUrl}/delete/container`;
    return this.http.delete<number>(url, {
      headers: new HttpHeaders({
        containerNum : containerNum.toString()
      })
    });
  }
}
