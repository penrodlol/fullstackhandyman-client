import { Component, OnInit } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit {

  cookieMapsContainers: CookieMapsContainers;

  constructor(private cookieContainersService: CookieContainersService, private dialogService: DialogService) { }

  ngOnInit() {
    this.cookieContainersService.cookieMapsContainers.subscribe(cookieMapsContainers => {
      this.cookieMapsContainers = cookieMapsContainers;
    });
  }

  createCookieMapsContainer() {
    this.dialogService.showCreateCookieMapsContainerDialog('Create Container');
  }

}
