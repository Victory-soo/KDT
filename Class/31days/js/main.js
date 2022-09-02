// @ts-check

const express = require('express');

const fs = require('fs');
const app = express();

const PORT = 4000;

// .use = Middle-Ware
//        서버에 들어온 요청이 들어와서 응답으로 나갈 때까지, 거치는 모든 함수 또는 기능을 의미
// res.send = 돌려줄 데이터가 없을 때, 전달하는 것
// res.end = 돌려줄 데이터가 있을 때, 전달
// next() = 다음 Middle-ware 호출
// app.use('/', async (req, res, next) => {
//   console.log('Middle-Ware 1');
//   req.reqTime = new Date();
//   req.fileContent = await fs.promises.readFile('package.json');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Middle-Ware 2');
//   console.log(req.reqTime);
//   console.log(req.fileContent);
//   next();
// });

// app.use((req, res) => {
//   console.log('Middle-Ware 3');
//   res.send('Communication END');
// });

// ================================================================

// params = 정의된 형태로만 데이터를 받을 수 있다.
// Query = url 뒤 ?를 붙인 뒤, 필드명 = 값 으로 사용하면 된다.

// app.get('/:id/:name', (req, res) => {
//   console.log(req.params);
//   res.send(`${req.params.id} ${req.params.name}`);
// });

// app.get('/', (req, res) => {
//   console.log(req.query);
//   console.log(req.query.title);
//   console.log(req.query.content);
//   res.send(req.query);
// });

// ================================================================

// 실습

// app.get('/:email/:password/:name/:gender', (req, res) => {
//   res.send(req.params)
// });

// app.get('/', (req, res) => {
//   if (
//     req.query.email === undefined ||
//     req.query.password === undefined ||
//     req.query.name === undefined ||
//     req.query.gender === undefined
//   ) {
//     res.send('NOT FOUND');
//   } else {
//     res.send(
//       `email = ${req.query.email} / password = ${req.query.password} / name = ${req.query.name} / gender = ${req.query.gender}`
//     );
//   }
// });

// ================================================================

// Express Rounting

// app.get('/', (req, res) => {
//   res.send('Get Method');
// });

// app.post('/', (req, res) => {
//   res.send('Post Method');
// });

// app.put('/', (req, res) => {
//   res.send('Put Method');
// });

// app.delete('/', (req, res) => {
//   res.send('Delete Method');
// });

// ================================================================

// Express Route

const userRouter = express.Router();
const postRouter = express.Router();

app.use('/users', userRouter);
app.use('/posts', postRouter);

userRouter.get('/', (req, res) => {
  res.send('User List');
});

userRouter.post('/:name', (req, res) => {
  res.send(`Name = ${req.params.name} uploaded.`);
});

postRouter.get('/', (req, res) => {
  res.send("Blog's article List");
});

postRouter.post('/:title', (req, res) => {
  res.send(`Title = ${req.params.title} is uploaded.`);
});

app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
