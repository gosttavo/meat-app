import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService){}

    //Vai verificar se está logado
    checkAuthentication(path: string): boolean{
        const loggedIn = this.loginService.isLoggedIn();

        if(!loggedIn){
            this.loginService.handleLogin(`${path}`);
        }

        return loggedIn;
    }

    //Vai evitar que a aplicação carregue os módulos se o usuário não está autorizado
    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path);
    }

    //Vai verificar se o usuário pode acessar a rota
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}