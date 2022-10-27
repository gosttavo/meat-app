import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export const handleAuthorization = (req: Request, resp: Response, next) => {
    const token = extractToken(req);

    if(!token){
        //enviar header do token
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT');

        resp.status(401).json({message: 'Você precisa se autenticar.'});
    }else{
        //verificar e decodifar o token caso esteja certo
        jwt.verify(token, 'meat-api-password', (error, decoded) => {
            //se tudo estiver correto deixa o request passar
            if(decoded){
                next();
            }else{
                resp.status(403).json({message: 'Não autorizado.'});
            }
        })
    }
}

//
function extractToken(req: Request): string {
    let token = undefined;

    //vai verificar se o token authorization está presente na header
    if(req.headers && req.headers.authorization){
        //Autorization: Bearer ZZZ.ZZZ.ZZZ
        const parts: string[] = req.headers.authorization.split(' ');

        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1];
        }
    }   

    return token;
}