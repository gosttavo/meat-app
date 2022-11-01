import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { MEAT_API } from "app/app.api";

import { Observable } from "rxjs";

import { Restaurant } from "./restaurant/restaurant.model";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

//receber serviço HTTP
@Injectable()
export class RestaurantService {

    constructor(private http: HttpClient){}

    //mapeando a resposta -> retornar método response
    restaurants(search?: string): Observable<Restaurant[]>{
        let params: HttpParams = undefined;

        if(search){
            params = new HttpParams().set('q', search);
        }

        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params}); //param q -> generico p pesquisa
    }

    //método para buscar detalhes dos restaurantes separadamente
    restaurantsById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
    }

    restaurantsReviews(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
    }

    restaurantsMenu(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
    }
}