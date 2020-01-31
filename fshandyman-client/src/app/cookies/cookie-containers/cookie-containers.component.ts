import { Component, OnInit } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit {

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
      .afterClosed().subscribe((result: any) => {
        this.cookieContainersService.createContainer(result.name).subscribe(
          (newCookieMapsContainer: CookieMapsContainers) => {
            this.snackbarService.openSnackbar({ text: `${newCookieMapsContainer.name} created!` });
            this.cookieContainersService.refreshCookieMapsContainers(newCookieMapsContainer);
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
}