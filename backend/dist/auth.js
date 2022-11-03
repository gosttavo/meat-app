"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthentication = function (req, resp) {
    //const que vai pegar o body do request
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        //criar token de acesso do usuário
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    //vai obter o email dos users
    var dbUser = users_1.users[user.email];
    //vai criar um método pra comparar email e password
    return dbUser !== undefined && dbUser.matches(user);
}
