import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cookie-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  cookieForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initCookieForm();
  }

  initCookieForm = () => this.cookieForm = this.fb.group({
    cookiesRootName: null,
    cookies: this.fb.group({
      name: null,
      value: null
    }),
    containsAutoReload: false
  })

}
