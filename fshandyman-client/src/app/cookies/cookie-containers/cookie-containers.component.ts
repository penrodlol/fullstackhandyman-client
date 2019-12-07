import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from './models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { from, Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { filter, pluck, defaultIfEmpty, take, mergeMap, flatMap, concatMap, map, tap, toArray } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit, OnDestroy {

  cookieMapsContainers: Observable<CookieMapsContainers[]>;

  constructor(private cookieContainersService: CookieContainersService,
    private dialogService: DialogService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.cookieMapsContainers = this.fetchCookieContainers();
  }

  ngOnDestroy(): void {
    this.cookieMapsContainers.subscribe().unsubscribe();
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
            this.snackbarService.openSnackbar({ text: `${cookieMapContainer.name} created!`, status: true });
            this.appendCookieMapContainer(cookieMapContainer);
          });
        } else {
          this.snackbarService.openSnackbar({ text: `${result.name} already exists.`, status: false, actionText:'Try again?' })
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
