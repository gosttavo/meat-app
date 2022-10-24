import { MenuItem } from "../menu-item/menu-item.model";
import { CartItem } from "./cart-item.model";

export class ShoppingCartService {
    items: CartItem[] = [];

    //método clear para limpar itens do carrinho
    clear(){
        this.items = [];
    }

    //adicionar items no carrinho
    addItem(item: MenuItem){
        //vai comparar se o ID do item que estou recebendo p/ parâmetro já existe
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

        if(foundItem){
            //se encontrar, soma a quantidade
            this.icrQuantity(foundItem);
        }else{
            //se não encontrar, adiciona no carrinho
            this.items.push(new CartItem(item));
        }
    }

    icrQuantity(item: CartItem){
        item.quantity = item.quantity + 1;
    }

    //rmeover items no carrinho
    removeItem(item: CartItem){
        //remover 1 item a partir do índice do item
        this.items.splice(this.items.indexOf(item), 1)
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