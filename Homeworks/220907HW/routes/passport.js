const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const verifyModule = require('./register').verifyPassword;

const mongoClient = require('./mongo');

module.exports = () => {
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
          if (idResult.salt !== undefined) {
            const passwordResult = verifyModule(pw, idResult.salt, idResult.pw);
            if (passwordResult) {
              cb(null, idResult);
            } else {
              cb(null, false, { message: 'Wrong password.' });
            }
          } else if (idResult.pw === pw) {
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

  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
      },
      async (accssToken, refreshToken, profile, cb) => {
        // console.log(profile);
        const client = await mongoClient.connect();
        const userCursor = client.db('board').collection('users');
        const idResult = await userCursor.findOne({ id: profile.id });
        if (idResult !== null) {
          cb(null, idResult);
        } else {
          const newNaverUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0].value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newNaverUser);
          if (dbResult.acknowledged) {
            cb(null, newNaverUser);
          } else {
            cb(null, false, { message: 'Sign-up Error.' });
          }
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accssToken, refreshToken, profile, cb) => {
        // console.log('google profile : ', profile);
        const client = await mongoClient.connect();
        const userCursor = client.db('board').collection('users');
        const idResult = await userCursor.findOne({ id: profile.id });
        if (idResult !== null) {
          cb(null, idResult);
        } else {
          const newGoogleUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newGoogleUser);
          if (dbResult.acknowledged) {
            cb(null, newGoogleUser);
          } else {
            cb(null, false, { message: 'Sign-up Error.' });
          }
        }
      }
    )
  );

  passport.use(
    new KakaoStrategy(
      {
        // Rest API 키
        clientID: process.env.KAKAO_CLIENT,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
      },
      async (accssToken, refreshToken, profile, cb) => {
        // console.log('Kakao profile : ', profile);
        const client = await mongoClient.connect();
        const userCursor = client.db('board').collection('users');
        const idResult = await userCursor.findOne({ id: profile.id });
        if (idResult !== null) {
          cb(null, idResult);
        } else {
          const newKakaoUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newKakaoUser);
          if (dbResult.acknowledged) {
            cb(null, newKakaoUser);
          } else {
            cb(null, false, { message: 'Sign-up Error.' });
          }
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        // Rest API 키
        clientID: process.env.FACEBOOK_CLIENT,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      },
      async (accssToken, refreshToken, profile, cb) => {
        // console.log('Kakao profile : ', profile);
        const client = await mongoClient.connect();
        const userCursor = client.db('board').collection('users');
        const idResult = await userCursor.findOne({ id: profile.id });
        if (idResult !== null) {
          cb(null, idResult);
        } else {
          const newFacebookUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newFacebookUser);
          if (dbResult.acknowledged) {
            cb(null, newFacebookUser);
          } else {
            cb(null, false, { message: 'Sign-up Error.' });
          }
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
};
