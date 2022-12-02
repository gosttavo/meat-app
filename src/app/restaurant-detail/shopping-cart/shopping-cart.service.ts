import { Injectable } from "@angular/core";

import { NotificationService } from "app/shared/messages/notification.service";

import { MenuItem } from "../menu-item/menu-item.model";
import { CartItem } from "./cart-item.model";

@Injectable()
export class ShoppingCartService {
    items: CartItem[] = [];

    //vai receber o evento notificação
    constructor(private notificationService: NotificationService){}

    //método clear para limpar itens do carrinho
    clear(){
        this.items = [];

        this.notificationService.notify(`Você removou todos os itens do carrinho.`);
    }

    //adicionar items no carrinho
    addItem(item: MenuItem){
        //vai comparar se o ID do item que estou recebendo p/ parâmetro já existe
        let foundItem = this.items.find((mItem) => mItem.menuItem._id === item._id);

        if(foundItem){
            //se encontrar, soma a quantidade
            this.icrQuantity(foundItem);
        }else{
            //se não encontrar, adiciona no carrinho
            this.items.push(new CartItem(item));
        }
        this.notificationService.notify(`Você adicionou o item ${item.name}`);
    }

    icrQuantity(item: CartItem){
        item.quantity = item.quantity + 1;
    }

    //remover items no carrinho
    removeItem(item: CartItem){
        //remover 1 item a partir do índice do item
        this.items.splice(this.items.indexOf(item), 1);

        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`);
    }

    dcrQuantity(item: CartItem){
        item.quantity = item.quantity - 1;

        if(item.quantity === 0){
            this.removeItem(item);
        }
    }

    //método total que vai calcular o total do carrinho
    total(): number{
        return this.items
        .map(item => item.value())
        .reduce((prev, value) => prev + value, 0);
    }
}