import { Component, OnInit, Input } from '@angular/core';
import { CookieMapsContainers } from '../cookie-containers/models/cookie-maps-containers.model';
import { CookieContainersService } from '../cookie-containers/service/cookie-containers.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

enum CookieMapsContainerProps {
  NAME = "name",
  TAG = "tag"
}

@Component({
  selector: 'cookie-container-toolbar',
  templateUrl: './cookie-container-toolbar.component.html',
  styleUrls: ['./cookie-container-toolbar.component.scss']
})
export class CookieContainerToolbarComponent implements OnInit {
  EDIT_CONTAINER_NAME_PLACEHOLDER = "Edit container name here";
  EDIT_CONTAINER_TAG_PLACEHOLDER = "Edit container tag here";

  @Input() cookieMapsContainer: CookieMapsContainers;

  isEditingName: Boolean = false;
  isEditingTag: Boolean = false;

  constructor(
    private cookieContainersService: CookieContainersService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() { }

  editContainer(type: String) {
    this.isEditingName = type === CookieMapsContainerProps.NAME ? true : false;
    this.isEditingTag = type === CookieMapsContainerProps.TAG ? true : false;
  }

  clearActiveInlineEdits() {
    this.isEditingName = false;
    this.isEditingTag = false;
  }

  updateContainer(value: string, type: String) {
    this.clearActiveInlineEdits();
    if (value == '' || value == null) { return; }
    
    const currentContainerName = this.cookieMapsContainer.name;
    const currentContainerTag = this.cookieMapsContainer.tag;

    switch (type) {
      case CookieMapsContainerProps.NAME: this.cookieMapsContainer.name = value; break;
      case CookieMapsContainerProps.TAG: this.cookieMapsContainer.tag = value; break;
    }

    this.cookieContainersService.editContainer(this.cookieMapsContainer)
    .subscribe(
      result => result,
      error => {
        this.snackbarService.openSnackbar({ text: error.error.reason });
        this.cookieMapsContainer.name = currentContainerName;
        this.cookieMapsContainer.tag = currentContainerTag;
      }
    );
  }
}