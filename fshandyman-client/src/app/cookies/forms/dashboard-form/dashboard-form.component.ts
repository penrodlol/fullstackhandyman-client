import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardModel } from '../../models/dashboard.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  @Output() dataModelEmitter: EventEmitter<DashboardModel> = new EventEmitter();

  dashboardForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dashboardForm = this.fb.group({
      customerId: null,
      storeId: null,
      userName: null,
      fromPms: true,
      hideHeader: true
    });
    this.dashboardValueChanges();
  }
  dashboardValueChanges() {
    this.dashboardForm
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(dashboardDataModel => {
        const customerId = dashboardDataModel.customerId;
        const storeId = dashboardDataModel.storeId;
        let dashboardModel: DashboardModel = new DashboardModel(customerId, storeId);
        dashboardModel.setUserName(dashboardDataModel.userName);
        dashboardModel.setFromPms(dashboardDataModel.fromPms);
        dashboardModel.setHideHeader(dashboardDataModel.hideHeader);
        console.log(dashboardModel);
      });
  }

}
