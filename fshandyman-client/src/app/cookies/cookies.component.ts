import { Component, OnInit } from '@angular/core';
import { CookieMapsContainers } from './cookie-containers/models/cookie-maps-containers.model';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  cookieMapsContainer: CookieMapsContainers;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  getCookieMapsContainer(cookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainer = cookieMapsContainer;
  }

  editContainerName() {

  }

  editContainerTag() {

  }

  removeContainer() {
    this.dialogService.showWarningDialog('Warning!',
    `Are you sure you want to remove '${this.cookieMapsContainer.name} (${this.cookieMapsContainer.tag})' permanently? All contents pertaining to this container will be lost.`, 
    'Yes', 'No')
      .afterClosed()
      .subscribe((requestedToRemove: Boolean) => {
        
      });
  }

}
