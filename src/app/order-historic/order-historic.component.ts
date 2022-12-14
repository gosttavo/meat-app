import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HistoricService } from './order-historic.service';
import { LoginService } from 'app/security/login/login.service';

import { User } from 'app/security/login/user.model';
import { OrderHistoric } from './historic-card/order-historic.model';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { doFormatPaymentOption } from './doFormartPaymentoOption';

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
    ]),
    // fundo escuro que fica atrás do modal
    trigger('overlay', [
      transition(':enter', [
        // Inicia com o opacity zerado
        style({ opacity: 0 }),
        
        // efetua a animação de 250ms para o
        // o opacity de 0 até 0.5
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        // Quando for esconder o overlay, 
        // anima do opacity atual, 0.5, até
        // o valor 0
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    // animação na parte branca do modal
    trigger('modal', [
      transition(':enter', [
        // inicia com o modal "lá em cima"
        style({ top: -999 }),
        
        // e finaliza com o modal no meio da tela
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
      
        // para esconder o modal, basta
        // "jogar ele lá para cima da tela"
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})
export class OrderHistoricComponent implements OnInit {

  orderHistoric: OrderHistoric[];
  order: OrderHistoric;

  historicState = 'ready';
  toggleState = 'hidden';

  toggleModal: boolean = false;

  searchControl: FormControl;

  constructor(
      private historicService: HistoricService,
      private loginService: LoginService,
    ) { }

  ngOnInit() {
    this.historicInit();
    this.doCreateSearchBar();
  }

  sendOrder(order: OrderHistoric) {
    return this.order = order;
  }

  toggle() {
    if(!this.toggleModal){
      this.toggleModal = true;
    } else {
      this.toggleModal = false;
    }
    return this.toggleModal;
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
  
  doFormatPaymentOption(paymentOption) {
    return paymentOption = doFormatPaymentOption(paymentOption);
  }

}

