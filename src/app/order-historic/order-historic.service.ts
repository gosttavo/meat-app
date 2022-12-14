import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { MEAT_API } from "app/app.api";

import { Observable } from "rxjs";
import { OrderHistoric } from "./historic-card/order-historic.model";
import { User } from "app/security/login/user.model";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class HistoricService {

  historic: OrderHistoric[];

  constructor(private http: HttpClient,
              private loginService: LoginService) { }

  user(): User {
    return this.loginService.user;
  }

  orderHistoric(): Observable<OrderHistoric[]> {
    return this.http.get<OrderHistoric[]>(`${MEAT_API}/orders/historic/${this.user().id}`);
  }

  orderHistoricById(id: string): Observable<OrderHistoric> {
    return this.http.get<OrderHistoric>(`${MEAT_API}/orders/${id}`);
  }
}