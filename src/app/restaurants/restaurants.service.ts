import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { MEAT_API } from "app/app.api";

import { Observable } from "rxjs";

import { Restaurant } from "./restaurant/restaurant.model";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

//receber serviço HTTP
@Injectable()
export class RestaurantService {

    rests: Observable<Restaurant[]>;
    restaurant: Restaurant[];

    constructor(private http: HttpClient) { }

    doFormatFilters(filters: any): HttpParams {
        console.log('== filtro srv ==', filters);
        let params: HttpParams = undefined;

        if (filters) {
            console.log('=== ANTES DO HTTP PARAMS ===',filters);
            params = new HttpParams()
                .set('_page', filters.page)
                .append('q', filters.search)
            console.log('=== APÓS O NEW HTTP PARAMS ===',filters);
        }
        console.log('===antes do return===', params);
        return params
    }

    //mapeando a resposta -> retornar método response
    restaurants(filters?: any): Observable<Restaurant[]> {
        const sendFilters = this.doFormatFilters(filters);
        console.log('== filters srv ==', sendFilters);

        this.rests = this.http.get<Restaurant[]>(
            `${MEAT_API}/restaurants`,
            { params: sendFilters }
        );

        return this.rests;
    }
    //#region === ROTAS COM ID ===

    restaurantsById(id: string): Observable<Restaurant> {
        console.log('== id rest ===', id)
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
    }

    restaurantsReviews(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
    }

    restaurantsMenu(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
    }

    //#endregion
}