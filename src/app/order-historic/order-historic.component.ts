import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { FormControl } from '@angular/forms';

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
    ]),
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class OrderHistoricComponent implements OnInit {

  orderHistoric: OrderHistoric[];

  historicState = 'ready';
  toggleState = 'hidden';

  searchControl: FormControl;

  constructor(
      private historicService: HistoricService,
      private loginService: LoginService,
    ) { }

  ngOnInit() {
    this.historicInit();
    this.doCreateSearchBar();
  }
  
  historicInit(){
    return this.historicService.orderHistoric()
    .subscribe(orderHistoric => this.orderHistoric = orderHistoric);
  }

  doGetUser(): User {
    return this.loginService.user;
  }

  doCreateSearchBar() {
    this.searchControl = new FormControl('');
  }

  toggleAppear() {
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

}

