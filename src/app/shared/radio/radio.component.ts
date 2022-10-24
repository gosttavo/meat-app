import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR ,ControlValueAccessor } from '@angular/forms';

import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[];

  value: any;

  //função
  onChange: any;

  constructor() { }

  ngOnInit() {
  }

  //mudar valor do componente
  setValue(value: any){
    this.value = value;
    this.onChange(this.value);
  }

  //passar valor pro componente
  writeValue(obj: any): void {
    this.value = obj;
  }

  //chamar a função sempre que o valor do componente mudar
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

}
