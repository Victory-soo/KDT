// 서버 포트설정

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 4000;

// ================================================================

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRouter = require('./routes/users');

app.use('/users', userRouter);

// throw err 받음 / 순서 error, req, res, next
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
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
