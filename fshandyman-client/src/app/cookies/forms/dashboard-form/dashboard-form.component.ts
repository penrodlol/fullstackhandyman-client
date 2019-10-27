import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DashboardModel } from '../../models/dashboard.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit, OnDestroy {
  @Output() dataModelEmitter: EventEmitter<DashboardModel> = new EventEmitter();

  dashboardForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dashboardForm = this.fb.group({
      customerId: new FormControl(null, [Validators.required]),
      storeId: null,
      userName: new FormControl(null, [Validators.required]),
      fromPms: true,
      hideHeader: true
    });
  }

  ngOnDestroy(): void {
    this.dashboardForm.reset();
  }

  isDashboardFormValid() {
    return this.dashboardForm.valid ? true : false;
  }

  submitDashboardForm() {
    if (this.isDashboardFormValid()) {
      const customerId = this.dashboardForm.get('customerId').value;
      const storeId = this.dashboardForm.get('storeId').value;
      const userName = this.dashboardForm.get('userName').value;
      const fromPms = this.dashboardForm.get('fromPms').value;
      const hideHeader = this.dashboardForm.get('hideHeader').value;

      const dashboardModel: DashboardModel = new DashboardModel(customerId, storeId);
      dashboardModel.setUserName(userName);
      dashboardModel.setFromPms(fromPms);
      dashboardModel.setHideHeader(hideHeader);

      this.dataModelEmitter.emit(dashboardModel);
    } else {
      // TODO: Error dialog
    }
  }

}
