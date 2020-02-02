import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-cookie-container',
  templateUrl: './create-cookie-container.component.html',
  styleUrls: ['./create-cookie-container.component.scss']
})
export class CreateCookieContainerComponent implements OnInit {
  MAX_NAME_LENGTH = 150;
  MAX_TAG_LENGTH = 10;

  createContainerForm: FormGroup;
  currentNameLength: number;
  currentTagLength: number;
  validNameLength: boolean;
  validTagLength: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createContainerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      tag: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
    this.currentNameLength = this.MAX_NAME_LENGTH;
    this.currentTagLength = this.MAX_TAG_LENGTH;
    this.validNameLength = true;
    this.validTagLength = true;
    this.onContainerNumUpdates();
  }

  onContainerNumUpdates() {
    this.createContainerForm.valueChanges.subscribe(currentState => {
      this.currentNameLength = this.MAX_NAME_LENGTH - currentState.name.length;
      this.validNameLength = this.currentNameLength >= 0 ? true : false;

      this.currentTagLength = this.MAX_TAG_LENGTH - currentState.tag.length;
      this.validTagLength = this.currentTagLength >= 0 ? true : false;
    });
  }

}
