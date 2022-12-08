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

  constructor() { }

  //#region === CONTROL VALUE ACCESSOR ===

  onChange = (value: any) => {};

  setRate(r: number){
    this.rate = r;
    this.previousRate = undefined;
    this.onChange(this.rate);
    this.rated.emit(this.rate);
    console.log('after ====> ', this.rate);
  }

  writeValue(r: number): void {
    this.rate = r;
    console.log('===WRITE VALUE=== ', this.rate);
  }

  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnChange(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

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
