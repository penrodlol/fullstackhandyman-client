import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-cookie-container',
  templateUrl: './create-cookie-container.component.html',
  styleUrls: ['./create-cookie-container.component.scss']
})
export class CreateCookieContainerComponent implements OnInit {
  MAX_LENGTH = 150;

  createContainerForm: FormGroup;
  currentNameLength: number;
  validNameLength: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createContainerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]]
    });
    this.currentNameLength = this.MAX_LENGTH;
    this.validNameLength = true;
    this.onContainerNumUpdates();
  }

  onContainerNumUpdates() {
    this.createContainerForm.valueChanges.subscribe(currentState => {
      this.currentNameLength = this.MAX_LENGTH - currentState.name.length;
      this.validNameLength = this.currentNameLength >= 0 ? true : false;
    });
  }

}
