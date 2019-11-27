import { Injectable } from '@angular/core';
import { DialogData, DialogComponent } from './dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { CreateCookieContainerFormComponent } from 'src/app/cookies/create-cookie-container-form/create-cookie-container-form.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogData: DialogData = {
    header: null,
    message: null,
    component: null,
    footerButton1: null,
    footerButton2: null,
    style: { color: null }
  };

  constructor(private dialog: MatDialog) { }

  private create(header: string, footerButton1: string, type: string, component?: any): MatDialogRef<DialogComponent, boolean> {
    this.dialogData.header = header;
    this.dialogData.footerButton1 = footerButton1;
    component ? this.initStyles(type, component) : this.initStyles(type);
    return this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: false,
      width: window.innerWidth > 1280 ? '35vw' : '50vw',
      position: { top: '45px' },
      data: this.dialogData
    });
  }

  private initStyles(style: string, component?: any) {
    switch (style) {
      case 'component':
        this.dialogData.style.color = '#ccccccad';
        this.dialogData.component = component;
        this.dialogData.footerButton2 = 'Cancel';
        break;
    }
  }

  showComponentDialog(header: string, footerButton1: string, component: any): Observable<boolean> {
    return this.create(header, footerButton1, 'component', component).afterClosed();
  }

}
