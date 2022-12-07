import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements OnInit, ControlValueAccessor {

  @Output() rated = new EventEmitter<number>();

  rates: number[] = [1,2,3,4,5];
  rate: number = 0;

  previousRate: number;

  onChange: any;

  constructor() { }

  //#region === CONTROL VALUE ACCESSOR ===

  setRate(r: number){
    this.rate = r;
    console.log('====> ', this.rate);
    this.onChange(this.rate);

    this.previousRate = undefined;
    this.rated.emit(this.rate);

    console.log('after ====> ', this.rate);
  }

  writeValue(r: number) {
    this.rate = r;
    console.log('===WRITE VALUE=== ', this.rate);
  }

  registerOnTouched(fn: any) {
    this.onChange = fn;
  }
  
  registerOnChange(fn: any) {}
  setDisabledState?(isDisabled: boolean) {}

  //#endregion

  ngOnInit() {
  }

  //vai setar a classificao de acordo com a movimentacao do mouse
  setTemporaryRate(r: number){
    if (this.previousRate === undefined){
      this.previousRate = this.rate;
    }
    this.rate = r;
  }

  //vai limpar a classificao de acordo com a movimentacao do mouse
  clearTemporaryRate(){
    if (this.previousRate !== undefined){
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }

}
