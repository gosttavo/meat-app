import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>();

  rates: number[] = [1,2,3,4,5];
  rate: number = 0;

  previousRate: number;

  constructor() { }

  ngOnInit() {
  }

  setRate(r: number){
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
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
      this. previousRate = undefined;
    }
  }

}
