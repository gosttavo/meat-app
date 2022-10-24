import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { MEAT_API } from "app/app.api";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from "./restaurant/restaurant.model";
import { ErrorHandler } from "app/app.error-handler";

//receber serviço HTTP
@Injectable()
export class RestaurantService {

    constructor(private http: Http){}

    //mapeando a resposta -> retornar método response
    restaurants(): Observable<Restaurant[]>{
        return this.http.get(`${MEAT_API}/restaurants`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }
}