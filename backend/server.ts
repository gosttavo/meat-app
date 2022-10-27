import * as jsonServer from 'json-server';
import { Express } from 'express';

import * as fs from 'fs';
import * as https from 'https';

import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// rota de login -> middleware do login
server.post('/login', handleAuthentication);

//middleware de autorização
server.use('/orders', handleAuthorization);

// Use default router
server.use(router)

// obter a chave https
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'), //caminho do certificado
  key: fs.readFileSync('./backend/keys/key.pem') //caminho do certificado
}

// criar servidor
https.createServer(options, server)
      .listen(3001, () => {
        console.log(',JSON Server is running on https://localhost:3001');
      })