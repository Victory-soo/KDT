// 서버 포트설정

const express = require('express');

const fs = require('fs');

// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoClient = require('./routes/mongo');

const app = express();

const PORT = 4000;

// ================================================================
// body-parser 코드
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser 코드
app.use(cookieParser());

// session 코드
app.use(
  session({
    secret: 'soo',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// passport 코드
app.use(passport.initialize());
app.use(passport.session());

// ejs 코드
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
// ================================================================
passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pw',
    },
    async (id, pw, cb) => {
      const client = await mongoClient.connect();
      const userCursor = client.db('board').collection('users');
      const idResult = await userCursor.findOne({ id });
      if (idResult !== null) {
        if (idResult.pw === pw) {
          cb(null, idResult);
        } else {
          cb(null, false, { message: 'Wrong password.' });
        }
      } else {
        cb(null, false, { message: 'Not exist ID.' });
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('board').collection('users');
  const result = await userCursor.findOne({ id });
  if (result !== null) cb(null, result);
});

const router = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

// ================================================================

// 서버 실행
app.listen(PORT, () => {
  console.log(`The express sever is running at ${PORT}`);
});
