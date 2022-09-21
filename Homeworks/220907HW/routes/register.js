// @ts-check

const express = require('express');

const crypto = require('crypto');

const router = express.Router();
const mongoClient = require('./mongo');

const createHashedPassword = (password) => {
  const salt = crypto.randomBytes(64).toString('base64');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  return { hashedPassword, salt };
};

const verifyPassword = (password, salt, userPassword) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');

  console.log('hashed', hashed);
  console.log('userpw', userPassword);

  if (hashed === userPassword) return true;
  return false;
};

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('board').collection('users');
  const duplicated = await userCursor.findOne({ id: req.body.id });

  const passwordResult = createHashedPassword(req.body.pw);

  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      name: req.body.name,
      pw: passwordResult.hashedPassword,
      salt: passwordResult.salt,
    });
    if (result.acknowledged) {
      res.statusCode = 202;
      res.send(
        'Successfully registered. <br><a href="/login">로그인 페이지로 이동</a>'
      );
    } else {
      res.statusCode = 500;
      res.send(
        'Register failed. <br><a href="/register">회원가입 페이지로 이동</a>'
      );
    }
  } else {
    res.statusCode = 300;
    res.send(
      'Already enterd ID. <br><a href="/register">회원가입 페이지로 이동</a>'
    );
  }
});

module.exports = { router, verifyPassword };
