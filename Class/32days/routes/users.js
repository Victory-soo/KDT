// @ts-check

const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'soo',
    name: 'Seungsu',
    email: 'victory-soo@naver.com',
  },
  {
    id: 'super',
    name: 'administrator',
    email: 'mucb0@gmail.com',
  },
];

router.get('/', (req, res) => {
  //   res.send(USER);

  //   .write 기능 써보기
  //   res.write('<h1> Dynamic Web Page</h1>');
  //   for (let i = 0; i < USER.length; i++) {
  //     res.write(`<h2 style="color: skyblue;"> User ID = ${USER[i].id} </h2>`);
  //     res.write(
  //       `<h2 style="color: lightgreen;">User Name = ${USER[i].name} </h2>`
  //     );
  //   }

  //   index.ejs 가져오기
  const userLen = USER.length;
  res.render('index', { USER, userCounts: userLen, imgName: 'sky.jpg' });
});

router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID Not Found.');
    err.statusCode = 404;
    throw err;
    // Error 던짐 -> app.js 로
  }
});

router.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('New user successfully admit.');
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const arrIndex = USER.findIndex((user) => user.id === req.params.id);
    if (arrIndex !== -1) {
      const modify = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modify;
      res.send('Member Information Modified');
    } else {
      res.end('There is no person has that ID.');
    }
  } else {
    const err = new Error("ID or Name doesn't entered.");
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:id', (req, res) => {
  if (req.params.id) {
    const arrIndex = USER.findIndex((user) => user.id === req.params.id);
    if (arrIndex !== -1) {
      USER.splice(arrIndex, 1);
      res.send('Members Information ejected.');
    } else {
      res.end('There is no person has that ID.');
    }
  } else {
    const err = new Error('Please enter the ID.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
