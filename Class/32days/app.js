// 서버 포트설정

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 4000;

// ================================================================

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRouter = require('./routes/users');

const postRouter = express.Router();

app.use('/users', userRouter);
app.use('/posts', postRouter);

// throw err 받음 / 순서 error, req, res, next
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  // err.message = 'ID Not Found.'
  res.end(err.message);
});

// public 폴더 연결 (css + js)
app.use(express.static('public'));

postRouter.get('/', (req, res) => {
  res.send("Blog's article List");
});

postRouter.post('/:title', (req, res) => {
  res.send(`Title = ${req.params.title} is uploaded.`);
});

// ================================================================

// 서버 실행
app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
