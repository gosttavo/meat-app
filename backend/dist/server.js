"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// rota de login -> middleware do login
server.post('/login', auth_1.handleAuthentication);
//middleware de autorização
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
// obter a chave https
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem') //caminho do certificado
};
// criar servidor
https.createServer(options, server)
    .listen(3001, function () {
    console.log(',JSON Server is running on https://localhost:3001');
});
