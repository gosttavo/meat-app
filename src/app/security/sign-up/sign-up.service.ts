import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

import { MEAT_API } from "app/app.api";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../login/user.model";

@Injectable()
export class SignUpService {

    user: User;

    constructor(private http: HttpClient) { };

    signUp( name: string,
            password: string,
            email: string,
            cpf: string,
            gender: string,
            profiles: string[] ): Observable<User> {

        return this.http.post<User>(`${MEAT_API}/users`,
            {
                name: name,
                password: password,
                email: email,
                cpf: cpf,
                gender: gender,
                profiles: profiles
            })
            .pipe(tap(user => this.user = user));
    }
}