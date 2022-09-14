// 서버 포트설정

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 4000;

// ================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const router = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
// const modifyRouter = require('./routes/modify');

app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postRouter);
// app.use('/posts/modify', modifyRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

app.use(express.static('public'));

// ================================================================

// 서버 실행
app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
