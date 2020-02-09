import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent {
  @Input() placeholder: string;
  @Output() resultEmitter: EventEmitter<any> = new EventEmitter();
  
  getInlineResult = (inlineValue: String): void => this.resultEmitter.emit(inlineValue);
}
