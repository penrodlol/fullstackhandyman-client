import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
  OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DialogData {
  header: string;
  message?: string;
  component?: any;
  footerButton1: string;
  footerButton2?: string;
  style: { color: string };
  additionalData?: any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dialogContent', {static: true, read: ViewContainerRef}) dialogContent: ViewContainerRef;
  componentRef: ComponentRef<any>;
  isValidForm: boolean;
  dialogSubmissionData: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.dialogSubmissionData = true;
    if (this.data.component) {
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.dialogContent.createComponent(factory);
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.componentRef) {
      this.validateFormData();
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  validateFormData() {
    of(Object.entries(this.componentRef.instance)).pipe(
      map(property => property.filter(data => data[1] instanceof FormGroup)[0][1])
    ).subscribe((result: FormGroup) => {
      result.statusChanges.subscribe(status => {
          if (status === 'VALID') {
            this.isValidForm = true;
            this.dialogSubmissionData = result.value;
          } else {
            this.isValidForm = false;
          }
      });
    });
  }

  close = () => this.dialogRef.close();

}
