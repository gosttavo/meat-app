import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Order } from "./order.model";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService{

    constructor(
        private cartService: ShoppingCartService, 
        private http: HttpClient
    ){}

    itemsValue(): number{
        return this.cartService.total();
    }

    cartItems(): CartItem[]{
        return this.cartService.items;
    }

    //métodos para enviar os itens CartItem para o
    //serviço
    icrQuantity(item: CartItem){
        this.cartService.icrQuantity(item);
    }

    dcrQuantity(item: CartItem){
        this.cartService.dcrQuantity(item);
    }

    remove(item: CartItem){
        this.cartService.removeItem(item);
    }

    clear(){
        this.cartService.clear();
    }

    //chamada HTTP -> finalizar a compra
    checkOrder(order: Order): Observable<string>{
        //3 parâmetros -> post
        return this.http.post<Order>(`${MEAT_API}/orders`, order) 
                        .pipe(map(order => order.id));            
    }
}