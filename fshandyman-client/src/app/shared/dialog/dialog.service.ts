import { Injectable } from '@angular/core';
import { DialogData, DialogComponent } from './dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogData: DialogData = {
    header: null,
    message: null,
    footerButton1: null,
    footerButton2: null,
    component: null,
    style: { color: null }
  };

  constructor(private dialog: MatDialog) { }

  private create(header: string, footerButton1: string, style: string, footerButton2: string = null,
                 component: any = null, message: string = null): MatDialogRef<DialogComponent, boolean> {
    this.dialogData.header = header;
    this.dialogData.message = message;
    this.dialogData.footerButton1 = footerButton1;
    this.dialogData.footerButton2 = footerButton2;
    this.dialogData.component = component;

    component != null ? this.initStyles(style, component) : this.initStyles(style);

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
        this.dialogData.component = component;
        this.dialogData.style.color = '#8e4dff';
        break;
      case 'warning':
          this.dialogData.style.color = '#b990ff';
          break;
    }
  }

  showComponentDialog(header: string, footerButton1: string, component: any, footerButton2?: string) {
    return this.create(header, footerButton1, 'component', footerButton2, component);
  }

  showWarningDialog(header: string, message: string, footerButton1: string, footerButton2?: string) {
    return this.create(header, footerButton1, 'warning', footerButton2, null, message);
  }
}
