import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { LoginService } from "./security/login/login.service";

import { NotificationService } from "./shared/messages/notification.service";

//classe para tratar erros
@Injectable()
export class AppErrorHandler extends ErrorHandler{

    constructor(private ns: NotificationService, 
                private injector: Injector,
                private zone: NgZone){
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any){        
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message;
            console.log(message);
            
            //zona criada para garantir que o angular executa os comandos abaixo
            this.zone.run(() => {
                switch(errorResponse.status){
                    case 401:
                        this.injector.get(LoginService).handleLogin();
                        break;
    
                    case 403:
                        this.ns.notify(message || 'Não autorizado.');
                        break;
    
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado.');
                        break;
                }
            })
        }
        super.handleError(errorResponse);
    }
}