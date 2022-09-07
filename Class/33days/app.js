// 서버 포트설정

const express = require('express');

// // express 내장 기능
// const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();

const PORT = 4000;

// ================================================================
// Middle-Ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const router = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postRouter);

// throw err 받음 / 순서 error, req, res, next
app.use((err, req, res, next) => {
  console.log(err.stack);
  // err.statuseCode = undefined 일 때, 500 값을 넣어줌
  res.status(err.statusCode || 500);
  // err.message = 'ID Not Found.'
  res.end(err.message);
});

// public 폴더 연결 (css + js)
app.use(express.static('public'));

// ================================================================

// 서버 실행
app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
