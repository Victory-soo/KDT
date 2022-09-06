// 서버 포트설정

const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 4000;

// ================================================================

app.set('view engine', 'ejs');
app.set('views', 'views');

const postRouter = require('./routes/posts');

app.use('/posts', postRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.end(err.message);
});

// app.use((req, res) => {
//   console.log(putTitle);
// });

app.use(express.static('public'));

// ================================================================

// 서버 실행
app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
