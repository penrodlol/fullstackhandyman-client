import { Component, OnInit } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { from, Subject } from 'rxjs';
import { filter, pluck, defaultIfEmpty } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit {

  cookieMapsContainers: CookieMapsContainers[];

  constructor(private cookieContainersService: CookieContainersService, private dialogService: DialogService) { }

  ngOnInit() {
    this.fetchCookieContainers();
  }

  fetchCookieContainers() {
    this.cookieContainersService.cookieMapsContainers.subscribe(cookieMapsContainers => {
      this.cookieMapsContainers = cookieMapsContainers;
    });
  }

  createCookieMapsContainer() {
    this.dialogService.showComponentDialog('Create Container', 'Create', CreateCookieContainerComponent, 'Cancel')
      .afterClosed().subscribe((result: any) => {
        from(this.cookieMapsContainers).pipe(
          pluck('name'),
          filter(containerName => containerName === result.name),
          defaultIfEmpty(null)
        ).subscribe(res => {
          if (res != null) {
          } else {
            this.cookieContainersService.createContainer(result.name).subscribe();
            this.cookieContainersService.reloadCookieMapsContainers();
            this.fetchCookieContainers();
          }
        });
      });
  }}
