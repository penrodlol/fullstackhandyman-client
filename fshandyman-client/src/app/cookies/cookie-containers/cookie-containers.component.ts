import { Component, OnInit } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit {

  cookieMapsContainers: Observable<CookieMapsContainers[]>;

  constructor(private cookieContainersService: CookieContainersService,
    private dialogService: DialogService, private snackbarService: SnackbarService) { }

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

        let recoredExists: boolean;

        this.cookieMapsContainers
          .pipe(map(containers => containers.filter(container => container.name === result.name)))
          .subscribe(names => recoredExists = names.length > 0 ? true : false);

        if (!recoredExists) {
          this.cookieContainersService.createContainer(result.name).subscribe((cookieMapContainer: CookieMapsContainers) => {
            this.snackbarService.openSnackbar({ text: `${cookieMapContainer.name} created!` });
            this.appendCookieMapContainer(cookieMapContainer);
          });
        } else {
          this.snackbarService.openSnackbar({ text: `${result.name} already exists.`, actionText:'Try again?' })
            .subscribe(event => {
              if (event.dismissedByAction) {
                this.createCookieMapsContainer();
              }
            });
        }
      });
  }

  appendCookieMapContainer(cookieMapContainer: CookieMapsContainers) {
    this.cookieMapsContainers.subscribe(containers => containers.push(cookieMapContainer));
  }
}
