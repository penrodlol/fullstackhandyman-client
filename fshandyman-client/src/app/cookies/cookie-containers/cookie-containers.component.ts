import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit {
  @Output() cookieMapsContainersSelection: EventEmitter<CookieMapsContainers> = new EventEmitter();

  cookieMapsContainers: Observable<CookieMapsContainers[]> = this.cookieContainersService.currentCookieMapsContainers;

  constructor(
    private cookieContainersService: CookieContainersService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.cookieContainersService.getCookieMapsContainers();
  }

  createCookieMapsContainer() {
    this.dialogService.showComponentDialog('Create Container', 'Create', CreateCookieContainerComponent, 'Cancel')
      .afterClosed()
      .pipe(takeWhile(result => result != null))
      .subscribe((result: any) => {
        this.cookieContainersService.createContainer(result.name, result.tag).subscribe(
          (newCookieMapsContainer: CookieMapsContainers) => {
            this.snackbarService.openSnackbar({ text: `${newCookieMapsContainer.name} created!` });
            this.cookieContainersService.appendCookieMapsContainer(newCookieMapsContainer);
          },
          ex => {
            this.snackbarService.openSnackbar({ text: ex.error.reason, actionText: 'Try again?' }).subscribe(event => {
              if (event.dismissedByAction) {
                this.createCookieMapsContainer();
              }
            });
          }
        );
      });
  }

  selectCookieMapsContainer(cookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainersSelection.emit(cookieMapsContainer);
  }
}