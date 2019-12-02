import { Component, OnInit } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { from, Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { filter, pluck, defaultIfEmpty, take, mergeMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit {

  cookieMapsContainers: Observable<CookieMapsContainers[]>;

  constructor(private cookieContainersService: CookieContainersService, private dialogService: DialogService) { }

  ngOnInit() {
    this.cookieMapsContainers = this.fetchCookieContainers();
  }

  fetchCookieContainers(): Observable<CookieMapsContainers[]> {
    return this.cookieContainersService.cookieMapsContainers.pipe(take(1));
  }

  createCookieMapsContainer() {
    this.dialogService.showComponentDialog('Create Container', 'Create', CreateCookieContainerComponent, 'Cancel')
      .afterClosed().subscribe((result: any) => {
        if (!result) { return; }

        from(this.cookieMapsContainers).pipe(
          pluck('name'),
          filter(containerName => containerName === result.name),
          defaultIfEmpty(null)
        ).subscribe(res => {
          if (res != null) {
          } else {
            this.cookieContainersService.createContainer(result.name).subscribe(cookieMapContainer => {
              this.cookieMapsContainers.subscribe(containers => {
                containers.push(cookieMapContainer);
              })
            });
          }
        });
      });
  }
}
