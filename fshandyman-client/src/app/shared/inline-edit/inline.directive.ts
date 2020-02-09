import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

const VALUE = '$event.target.value';

@Directive({
  selector: '[appInline]'
})
export class InlineDirective {
  @Output() inlineInputResult: EventEmitter<String> = new EventEmitter();

  @HostListener('keydown.enter', [VALUE])
  @HostListener("blur", [VALUE])
  onEvent(value: String) { this.inlineInputResult.emit(value); }
}