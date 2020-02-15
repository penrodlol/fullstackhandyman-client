import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CookieContainersService } from '../../cookie-containers/service/cookie-containers.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { CookieMapsContainers } from '../../models/cookie-maps-containers.model';

enum CookieMapsContainerProps {
  NAME = "name",
  TAG = "tag"
}

@Component({
  selector: 'cookie-container-toolbar',
  templateUrl: './cookie-container-toolbar.component.html',
  styleUrls: ['./cookie-container-toolbar.component.scss']
})
export class CookieContainerToolbarComponent {
  EDIT_CONTAINER_NAME_PLACEHOLDER = "Edit container name here";
  EDIT_CONTAINER_TAG_PLACEHOLDER = "Edit container tag here";

  @Input() cookieMapsContainer: CookieMapsContainers;
  @Output() removedCookieMapsContainer: EventEmitter<CookieMapsContainers> = new EventEmitter();

  isEditingName: Boolean = false;
  isEditingTag: Boolean = false;

  constructor(
    private cookieContainersService: CookieContainersService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService
  ) { }

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

  removeContainer() {
    this.dialogService.showWarningDialog('Warning!',
      `Are you sure you want to remove '${this.cookieMapsContainer.name}' permanently. All cookies for this container will be lost.`,
      'Yes', 'No').afterClosed().subscribe((didRemoveContainer: Boolean) => {
        if (didRemoveContainer) {
          this.cookieContainersService.removeContainer(this.cookieMapsContainer.containerNum).subscribe(
            _ => {
              this.snackbarService.openSnackbar( {text: `${this.cookieMapsContainer.name} has been successfully removed.`} );
              this.removedCookieMapsContainer.emit(this.cookieMapsContainer);
              this.cookieMapsContainer = null;
            },
            ex => this.snackbarService.openSnackbar({ text: ex.error.reason })
          );
        }
      });
  }
}