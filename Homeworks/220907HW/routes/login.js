// @ts-check

const express = require('express');

const router = express.Router();
const passport = require('passport');
const mongoClient = require('./mongo');

const isLogin = (req, res, next) => {
  if (req.session.login || req.user || req.signedCookies.user) {
    next();
  } else {
    res.statusCode = 300;
    res.send('Login required. <br><a href="/login">로그인 페이지로 이동</a>');
  }
};

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send(
        `${info.message}<br><a href="/login">로그인 페이지로 이동</a>`
      );
    }
    req.logIn(user, (err) => {
      if (err) throw err;
      res.cookie('user', req.body.id, {
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        signed: true,
      });
      res.redirect('./posts');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
module.exports = { router, isLogin };
