import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  header: string;
  message?: string;
  component?: any;
  footerButton1: string;
  footerButton2?: string;
  style: { color: string };
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContent', {static: true, read: ViewContainerRef}) dialogContent: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.dialogContent.createComponent(factory);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close = () => this.dialogRef.close();

}
