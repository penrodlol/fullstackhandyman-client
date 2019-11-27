import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  dialogForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.dialogForm = new FormGroup({

    });
  }

}
