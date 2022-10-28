import { Request, Response } from 'express';
import { User, users } from './users';

import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';

export const handleAuthentication = (req: Request, resp: Response) => {
    //const que vai pegar o body do request
    const user: User = req.body;

    if(isValid(user)) {
        const dbUser = users[user.email];
        
        //criar token de acesso do usuário
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret);

        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token});
    }else {
        resp.status(403).json({message: 'Dados inválidos.'});
    }
}

function isValid(user: User): boolean{
    if(!user){
        return false;
    }
    //vai obter o email dos users
    const dbUser = users[user.email];

    //vai criar um método pra comparar email e password
    return dbUser !== undefined && dbUser.matches(user);
}