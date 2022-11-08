import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { MEAT_API } from "app/app.api";

import { Observable } from "rxjs";
import { OrderHistoric } from "./historic-card/order-historic.model";

@Injectable()
export class HistoricService {

    historic: OrderHistoric[];

    constructor(private http: HttpClient){}

    orderHistoric(): Observable<OrderHistoric[]>{
      return this.http.get<OrderHistoric[]>(`${MEAT_API}/orders`);
    }
}