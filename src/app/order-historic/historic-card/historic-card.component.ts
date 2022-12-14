import { Component, OnInit, Input } from '@angular/core';

import { OrderHistoric } from './order-historic.model';

@Component({
  selector: 'mt-historic-card',
  templateUrl: './historic-card.component.html'
})
export class HistoricCardComponent implements OnInit {

  @Input() order: OrderHistoric;

  constructor() { }

  ngOnInit() {
  }
}
