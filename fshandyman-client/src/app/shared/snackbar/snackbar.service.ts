import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material';
import { SnackbarComponent } from './snackbar.component';
import { Observable } from 'rxjs';

@Injectable()
export class SnackbarService {

  constructor(public snackbar: MatSnackBar) { }

  openSnackbar(data: { text: string, status: boolean, actionText?: string }, dur?: number): Observable<MatSnackBarDismiss> {
    return this.snackbar.openFromComponent(SnackbarComponent, {
      data: data,
      duration: data.actionText ? null : (dur ? dur * 1000 : 3000),
      verticalPosition: 'top',
    }).afterDismissed();
  }
}
