import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Order, OrderItem } from "./order.model";
import { MEAT_API } from "app/app.api";

import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService{
    constructor(private cartService: ShoppingCartService, 
                private http: HttpClient, 
                private loginService: LoginService){}

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
        //header que vai carregar o token do login
        let headers = new HttpHeaders(); //imutável

        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`);
        }

        //3 parâmetros -> post
        //1º -> URL para onde o objeto será mandado
        //2º -> objeto que será mandado -> mandado em formato string
        //3º -> Headers -> tipo de dado que será mandado -> content type
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})    
                        .map(order => order.id);
    }
}