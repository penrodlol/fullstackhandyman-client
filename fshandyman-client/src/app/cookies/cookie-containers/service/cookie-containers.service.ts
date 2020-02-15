import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from, } from 'rxjs';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';
import { UrlBuilderService } from 'src/app/shared/url/url-builder.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CookieContainersService implements OnDestroy {
  cookieUrl: string;

  private cookieMapsContainersSource: BehaviorSubject<CookieMapsContainers[]> = new BehaviorSubject([]);
  currentCookieMapsContainers: Observable<CookieMapsContainers[]> = from(this.cookieMapsContainersSource);

  constructor(private urlBuilderService: UrlBuilderService, private http: HttpClient) {
    this.cookieUrl = this.urlBuilderService.buildUrl('cookie');
  }

  ngOnDestroy(): void {
    this.cookieMapsContainersSource.unsubscribe();
  }
  
  getContainers(): void {
    const url = `${this.cookieUrl}/containers`;
    this.http.get<CookieMapsContainers[]>(url).subscribe(cookieMapsContainers => {
      this.cookieMapsContainersSource.next(cookieMapsContainers);
    });
  }

  private appendContainer(cookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainersSource.pipe(take(1)).subscribe(oldCookieMapsContainers => {
      this.cookieMapsContainersSource.next([...oldCookieMapsContainers, cookieMapsContainer]);
    });
  }

  createContainer(containerName: string, containerTag: string): Observable<CookieMapsContainers> {
    const url = `${this.cookieUrl}/create/container`;
    return this.http.post<any>(url, null, {
      headers: new HttpHeaders({
        name: containerName,
        tag: containerTag
      })
    }).pipe(tap(container => this.appendContainer(container)));
  }

  editContainer(cookieMapsContainer: CookieMapsContainers) {
    const url = `${this.cookieUrl}/edit/container`;
    return this.http.put<CookieMapsContainers>(url, cookieMapsContainer);
  }

  removeContainer(containerNum: number) {
    const url = `${this.cookieUrl}/delete/container`;
    return this.http.delete<number>(url, {headers: new HttpHeaders({
      'containerNum': containerNum.toString()
      })
    }).pipe(
      tap((containerNum: number) => {
        this.cookieMapsContainersSource.pipe(
          take(1),
          map(cookieMapsContainers => cookieMapsContainers.filter(cookieMapsContainer => 
            cookieMapsContainer.containerNum !== containerNum))
        ).subscribe(cookieMapsContainers => this.cookieMapsContainersSource.next(cookieMapsContainers));
      })
    );
  }
}
