import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html',
})
export class DeliveryCostsComponent implements OnInit {

  //frete
  @Input() delivery: number;
  //valor do pedido
  @Input() itemsValue: number;

  constructor() { }

  ngOnInit() {
  }

  total(): number {
    return this.delivery + this.itemsValue;
  }

}
2