import { Component, OnInit } from '@angular/core';
import { OrderHistoric } from './historic-card/order-historic.model';
import { HistoricService } from './order-historic.service';

@Component({
  selector: 'mt-order-historic',
  templateUrl: './order-historic.component.html',
})
export class OrderHistoricComponent implements OnInit {

  orderHistoric: OrderHistoric[];

  constructor(private historicService: HistoricService) { }

  ngOnInit() {
    this.historicService.orderHistoric()
    .subscribe(orderHistoric => this.orderHistoric = orderHistoric);
  }

}
