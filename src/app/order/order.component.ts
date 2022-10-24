import { Component, OnInit } from '@angular/core';
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

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Débito', value: 'DEB'},
    {label: 'Crédito', value: 'CRED'},
  ];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
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

  checkOrder(order: Order){
    //mapear o array de cartitems e transformar em orderitems
    order.orderItems = this.cartItems()
     .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        //navegar p tela de sucesso
        this.router.navigate(['/order-summary']);
        //limpar o carrinho
        this.orderService.clear();
      })
    console.log(order);
  }

}
