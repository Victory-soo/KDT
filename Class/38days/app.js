// @ts-check

// Koa
const Koa = require('koa');

// Koa-pug(view-engine)
const Pug = require('koa-pug');
const path = require('path');

// mongo
const mongoClient = require('./public/mongo');
const _client = mongoClient.connect();

const websockify = require('koa-websocket');
const route = require('koa-route');
const serve = require('koa-static');
const mount = require('koa-mount');

// env
require('dotenv').config();

const app = websockify(new Koa());

const PORT = process.env.PORT;

app.use(mount('/public', serve('public')));

// pug - views 폴더 설정
const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
});

app.ws.use(
  route.all('/chat', async (ctx) => {
    // app.ws 안에 server 값을 { server } 안에 넣음
    const { server } = app.ws;

    const client = await _client;
    const cursor = client.db('board').collection('chats');
    const chats = cursor.find(
      {},
      {
        sort: {
          createdAt: 1,
        },
      }
    );
    const chatsData = await chats.toArray();

    ctx.websocket.send(
      JSON.stringify({
        type: 'sync',
        data: {
          chatsData,
        },
      })
    );

    server?.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'chat',
          data: {
            name: 'Server',
            msg: `New user is entered. 
            User number is ${server?.clients.size}`,
            bg: 'bg-dark',
            text: 'text-white',
          },
        })
      );
    });
    // back-end 서버 => Clint 메세지 보냄

    ctx.websocket.on('message', async (message) => {
      const chat = JSON.parse(message);

      const insertClient = await _client;
      const chatCursor = insertClient.db('board').collection('chats');
      await chatCursor.insertOne({
        // name: chat.name,
        // msg: chat.msg,
        // bg: chat.bg,
        // text: chat.text,
        ...chat,
        createdAT: new Date(),
      });

      server?.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'chat',
            data: {
              ...chat,
            },
          })
        );
      });
    });

    // 특정 상황 생기면 행동
    ctx.websocket.on('close', () => {
      server?.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'chat',
            data: {
              name: 'Server',
              msg: `New user is exited. 
                User number is ${server?.clients.size}`,
              bg: 'bg-danger',
              text: 'text-white',
            },
          })
        );
      });
    });
  })
);

app.use(async (ctx, next) => {
  await ctx.render('chat');
});

app.listen(PORT, () => {
  console.log(`Koa Server is running at ${PORT}.`);
});
