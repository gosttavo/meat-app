import { Component, OnInit } from '@angular/core';

import { HistoricService } from './order-historic.service';
import { LoginService } from 'app/security/login/login.service';

import { User } from 'app/security/login/user.model';
import { OrderHistoric } from './historic-card/order-historic.model';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mt-order-historic',
  templateUrl: './order-historic.component.html',
  animations: [
    trigger('historicAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class OrderHistoricComponent implements OnInit {

  orderHistoric: OrderHistoric[];

  historicState = 'ready';

  constructor(
      private historicService: HistoricService,
      private loginService: LoginService,
    ) { }

  ngOnInit() {
    this.historicInit();
  }
  
  historicInit(){
    return this.historicService.orderHistoric()
    .subscribe(orderHistoric => this.orderHistoric = orderHistoric);
  }

  doGetUser(): User {
    return this.loginService.user;
  }
}

