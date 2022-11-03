import { Component, OnInit, Input } from '@angular/core';

import { OrderHistoric } from './order-historic.model';

@Component({
  selector: 'mt-historic-card',
  templateUrl: './historic-card.component.html',
  styleUrls: ['./historic-card.component.css']
})
export class HistoricCardComponent implements OnInit {

  @Input() orderHistoric: OrderHistoric;

  constructor() { }

  ngOnInit() {
  }

}
