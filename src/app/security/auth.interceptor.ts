import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";

@Injectable()//interceptor pra mandar o token de login pro request
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);

        if(loginService.isLoggedIn()){
           //httprequest -> objeto imutável
           const authRequest = req.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}});
           return next.handle(authRequest);
        } else{
            return next.handle(req);
        }
    }
}