import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

//classe para tratar erros
export class ErrorHandler{
    //método estático -> parâmetro response -> vai me dizer qual url tentou acessar
    static handleError(error: Response | any){
        let errorMessage: string;

        if(error instanceof Response){
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
        } else{
            errorMessage = error.toString();
        }

        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }
}