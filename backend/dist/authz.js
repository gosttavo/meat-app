"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
exports.handleAuthorization = function (req, resp, next) {
    var token = extractToken(req);
    if (!token) {
        //enviar header do token
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT');
        resp.status(401).json({ message: 'Você precisa se autenticar.' });
    }
    else {
        //verificar e decodifar o token caso esteja certo
        jwt.verify(token, 'meat-api-password', function (error, decoded) {
            //se tudo estiver correto deixa o request passar
            if (decoded) {
                next();
            }
            else {
                resp.status(403).json({ message: 'Não autorizado.' });
            }
        });
    }
};
//
function extractToken(req) {
    var token = undefined;
    //vai verificar se o token authorization está presente na header
    if (req.headers && req.headers.authorization) {
        //Autorization: Bearer ZZZ.ZZZ.ZZZ
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
