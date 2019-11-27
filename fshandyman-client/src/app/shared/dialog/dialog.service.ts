import { Injectable } from '@angular/core';
import { DialogData, DialogComponent } from './dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogData: DialogData = {
    header: null,
    message: null,
    form: null,
    footerButton1: null,
    footerButton2: null,
    style: { icon: null, color: null }
  };

  constructor(private dialog: MatDialog) { }

  private create(type: string, header: string): MatDialogRef<DialogComponent, boolean> {
    this.dialogData.header = header;
    this.initStyles(type);
    return this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: false,
      width: window.innerWidth > 1280 ? '35vw' : '50vw',
      position: { top: '45px' },
      data: this.dialogData
    });
  }

  private initStyles(style: string) {
    switch (style) {
      case 'createCookieMapsContainer':
        this.dialogData.style.icon = 'icon-here';
        this.dialogData.style.color = '#ccccccad';
        this.dialogData.form = true;
        this.dialogData.footerButton1 = 'Create';
        this.dialogData.footerButton2 = 'Cancel';
        break;
    }
  }

  showCreateCookieMapsContainerDialog(header: string): Observable<boolean> {
    return this.create('createCookieMapsContainer', header).afterClosed();
  }

}
