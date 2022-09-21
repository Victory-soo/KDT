// @ts-check

const express = require('express');

const router = express.Router();

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  //   ws.send('I am Server. R U OKAY?');
  //   ws.on('message', (message) => {
  //     console.log(message.toString());
  //   });(
  wss.clients.forEach((client) => {
    client.send(
      `New user is entered. The number of users is ${wss.clients.size}.`
    );
  });

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(message.toString());
    });
  });

  ws.on('close', () => {
    wss.clients.forEach((client) => {
      client.send(
        ` User is out. Now, the number of users is ${wss.clients.size}`
      );
    });
  });
});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
