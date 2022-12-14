import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'app/order/order.service';

@Component({
  selector: 'mt-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent implements OnInit {

  rated: boolean;
  ratingValue: number = 5;

  orderId: string = '639a1c139e84761b74fcdf9e';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  rate(evt){
    console.log('==rating==',evt);
    this.rated = true;
    this.ratingValue = evt;

    this.orderService.updateRatingOrder(this.orderId, this.ratingValue).subscribe(res => {
        console.log('=== res update rating ===', res);
      }, resError => {
        console.log('=== resError update rating ===', resError);
      }, () => {});
  }

}
