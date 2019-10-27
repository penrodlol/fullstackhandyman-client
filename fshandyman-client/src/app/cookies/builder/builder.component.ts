import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardModel } from '../models/dashboard.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, OnDestroy {
  @Output() cookieModelEmitter: EventEmitter<any> = new EventEmitter();


  cookieForm: FormGroup;
  dataModelOptions: string[] = [
    'Dashboard',
    'Admin',
    'Task Queue',
    'Patient',
    'Messaging'
  ];
  selectedDataModel: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.cookieForm = this.fb.group({
      dataModel: null
    });
    this.onCookieFormChange();
  }

  ngOnDestroy(): void {
  }

  checkSelectedDataModelOption() {
    switch (true) {
      case this.selectedDataModel === 'Dashboard' : return 0;
      case this.selectedDataModel === 'Admin' : return 1;
      case this.selectedDataModel === 'Task Queue' : return 2;
      case this.selectedDataModel === 'Patient' : return 3;
      case this.selectedDataModel === 'Messaging' : return 4;
    }
  }

  onCookieFormChange() {
    this.cookieForm
      .get('dataModel')
      .valueChanges
      .subscribe(dataModel => {
        this.selectedDataModel = dataModel;
      });
  }

  fetchCookiesInContext(cookieModel: any) {
    this.cookieModelEmitter.emit(cookieModel);
  }
}
