import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CookieContainersService } from './service/cookie-containers.service';
import { CookieMapsContainers } from '../models/cookie-maps-containers.model';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CreateCookieContainerComponent } from './create-cookie-container/create-cookie-container.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'cookie-containers',
  templateUrl: './cookie-containers.component.html',
  styleUrls: ['./cookie-containers.component.scss']
})
export class CookieContainersComponent implements OnInit, OnChanges {
  @Input() removedCookieMapsContainer: CookieMapsContainers;
  @Output() cookieMapsContainersSelection: EventEmitter<CookieMapsContainers> = new EventEmitter();

  currentCookieMapsContainers: CookieMapsContainers[];

  constructor(
    private cookieContainersService: CookieContainersService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.cookieContainersService.getContainers().subscribe(cookieMapsContainers => {
      this.currentCookieMapsContainers = cookieMapsContainers;
    });
    const lastCookieMapsContainer = sessionStorage.getItem('lastCookieMapsContainer');
    if (lastCookieMapsContainer) {
      this.cookieMapsContainersSelection.emit(JSON.parse(lastCookieMapsContainer));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.removedCookieMapsContainer) {
      this.currentCookieMapsContainers = this.currentCookieMapsContainers.filter(cookieMapsContainers => {
        return cookieMapsContainers.containerNum !== this.removedCookieMapsContainer.containerNum;
      });
      this.removedCookieMapsContainer = null;
    }
  }

  createCookieMapsContainer() {
    this.dialogService.showComponentDialog('Create Container', 'Create', CreateCookieContainerComponent, 'Cancel')
    .afterClosed()
    .pipe(takeWhile(formRes => formRes != null))
    .subscribe((formRes: any) => {
      this.cookieContainersService.createContainer(formRes.name, formRes.tag)
      .subscribe(cookieMapsContainer => {
        this.snackbarService.openSnackbar({ text: `${cookieMapsContainer.name} created!` });
        this.currentCookieMapsContainers.push(cookieMapsContainer);
        this.cookieMapsContainersSelection.emit(cookieMapsContainer);
      },
      ex => {
        this.snackbarService.openSnackbar({ text: ex.error.reason, actionText: 'Try again?' })
        .pipe(takeWhile(event => event.dismissedByAction))
        .subscribe(_ => this.createCookieMapsContainer());
      });
    })
  }

  selectCookieMapsContainer(cookieMapsContainer: CookieMapsContainers) {
    this.cookieMapsContainersSelection.emit(cookieMapsContainer);
  }
}