import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { DatePipe } from '@angular/common'

import { Router } from '@angular/router';

import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { LoginService } from 'app/security/login/login.service';
import { User } from 'app/security/login/user.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { tap } from 'rxjs/operators';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  providers: [DatePipe]
})
export class OrderComponent implements OnInit {

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup;

  delivery: number = 8;
  orderId: string;
  date = new Date();

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Débito', value: 'DEB' },
    { label: 'Crédito', value: 'CRED' },
    { label: 'PIX', value: 'PIX' }
  ];

  constructor(private orderService: OrderService,
    private router: Router,
    private loginService: LoginService,
    public datePipe: DatePipe) { }

  ngOnInit() {
    console.log('== init order ==', this.itemsValue())
    //criação do formulário -> Reactive Form
    this.doCreateOrderForm();
    this.doSetTotalValueForm(this.itemsValue())
  }

  //#region === FUNCOES DO FORMULARIO ===

  doCreateOrderForm() {
    this.orderForm = new FormGroup({
      userName: new FormControl(this.formatUserName(), {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      user: new FormControl(this.user().id, {
        validators: [Validators.required]
      }),
      address: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }
      ),
      number: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.numberPattern)]
      }
      ),
      optionalAddress: new FormControl(''),
      paymentOption: new FormControl('',
        [Validators.required]
      ),
      date: new FormControl(this.getDate(), { validators: [Validators.required] }),
      totalOrder: new FormControl(0),
    })
  }

  formatUserName(){;
    let name = this.user().name
    let lastName = this.user().lastName;
    return name + ' ' + lastName;
  }

  doClearOrderForm() {
    if (this.orderForm) {
      this.orderForm.reset();
      this.doCreateOrderForm();
    }
  }

  doSetTotalValueForm(value: number) {
    this.orderForm.controls.totalOrder.setValue(value);
  }

  getDate() {
    return this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss')
  }

  //#endregion

  //#region === OPERAÇÕES DO CART ITEM === 

  icrQuantity(item: CartItem) {
    this.orderService.icrQuantity(item);
  }

  dcrQuantity(item: CartItem) {
    this.orderService.dcrQuantity(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  //propriedade que vai retonar o valor dos itens
  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  //#endregion

  //#region === FUNCOES PARA SALVAR ===

  doConfirmOrder(order: Order) {
    if (!this.orderForm.valid) {
      return
    }

    order.orderItems = this.doMapOrderItems();

    this.checkOrder(order)
  }

  doMapOrderItems(): OrderItem[] {
    return this.cartItems()
      .map((item: CartItem) => new OrderItem(
        item.quantity,
        item.menuItem._id,
        item.menuItem.price,
        item.menuItem.name
      ))
  }

  //#endregion

  checkOrder(order: Order) {
    this.orderService.checkOrder(order).pipe(tap((orderId: string) => 
      { this.orderId = orderId }))
    .subscribe((orderId: string) => {
      this.router.navigate([`/order-summary`]); //navegar p tela de sucesso
      this.orderService.clear(); //limpar o carrinho
    })
  }

  user(): User {
    return this.loginService.user;
  }

}
