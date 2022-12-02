import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { MEAT_API } from "app/app.api";
import { User } from "./user.model";

import { tap, filter } from "rxjs/operators";

import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class LoginService {

    user: User;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    //método p verificar se o usuário ta logado
    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/users/authenticate`,
            { email: email, password: password })
            .pipe(tap(user => this.user = user)); //vai receber o usuário)
    }

    //se o usuário tentar finalizar compra sem estar logado
    //envia pra tela de login
    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }

    //função de logout
    logout() {
        this.user = undefined;
    }

}