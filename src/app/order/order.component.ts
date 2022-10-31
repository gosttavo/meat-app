import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

import { Router } from '@angular/router';

import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/

  //propriedade que vai representar o formulário
  orderForm: FormGroup;

  delivery: number = 8;

  orderId: string;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Débito', value: 'DEB'},
    {label: 'Crédito', value: 'CRED'},
  ];

  constructor(private orderService: OrderService, 
              private router: Router,
              private formBuilder: FormBuilder) { } 

  ngOnInit() {
    //criação do formulário -> Reactive Form
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  //função para validar os campos de email
  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email'); //vai pegar a referencia do input
    const emailConfirmation = group.get('emailConfirmation'); //vai pegar a referencia do input

    if(!email || !emailConfirmation){ //se não existirem retorna undefined
      return undefined;
    }

    if(email.value !== emailConfirmation.value){ //se os valores são diferentes retorna uma chave
      return {emailsNotMatch: true};
    }
    return undefined;
  }

  //propriedade que vai retonar o valor dos itens
  itemsValue(): number{
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems();
  }

  //métodos pra enviar os itens CartItem para o
  //serviço para fazer as operações 

  icrQuantity(item: CartItem){
    this.orderService.icrQuantity(item);
  }

  dcrQuantity(item: CartItem){
    this.orderService.dcrQuantity(item);
  }

  remove(item: CartItem){
    this.orderService.remove(item);
  }

  isOrderCompleted(): boolean{
    return this.orderId !== undefined;
  }

  checkOrder(order: Order){
    //mapear o array de cartitems e transformar em orderitems
    order.orderItems = this.cartItems()
     .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .do((orderId: string) => {
        this.orderId = orderId;
      })
      .subscribe((orderId: string) => {
        //navegar p tela de sucesso
        this.router.navigate(['/order-summary']);
        //limpar o carrinho
        this.orderService.clear();
      })
  }

}
