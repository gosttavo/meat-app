import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html',
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[];
  
  @Output() icrQuantity = new EventEmitter<CartItem>();
  @Output() dcrQuantity = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit() {
  }

  //aumentar quantidade produto
  emitIcrQuantity(item: CartItem){
    this.icrQuantity.emit(item);
  }

  //diminuir quantidade produto
  emitDcrQuantity(item: CartItem){
    this.dcrQuantity.emit(item);
  }

  //remover produto
  emitRemove(item: CartItem){
    this.remove.emit(item);
  }

}
