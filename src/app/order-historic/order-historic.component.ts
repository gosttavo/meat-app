import { Component, OnInit } from '@angular/core';
import { OrderHistoric } from './historic-card/order-historic.model';

@Component({
  selector: 'mt-order-historic',
  templateUrl: './order-historic.component.html',
  styleUrls: ['./order-historic.component.css']
})
export class OrderHistoricComponent implements OnInit {

  orderHistoric: OrderHistoric[] = [
    {
      name: "gustavo",
      email: "gustavogoulart92@gmail.com",
      address: "121313",
      number: 3131,
      optionalAddress: "3131",
      paymentOption: "DEB",
      orderItems: [
        {
          quantity: 1,
          menuId: "cup-cake"
        }
      ],
      id: 10,
    },
    {
      name: "ventura",
      email: "gustavogoulart92@gmail.com",
      address: "ewewew",
      number: 12,
      optionalAddress: "",
      paymentOption: "MON",
      orderItems: [
        {
          quantity: 1,
          menuId: "sunday"
        }
      ],
      id: 7,
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
