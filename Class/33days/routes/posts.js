// @ts-check

const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'test123',
    content: 'test456',
  },
  {
    title: 'I am',
    content: 'Iron Man',
  },
];

router.get('/', (req, res) => {
  //   index.ejs 가져오기
  const postLen = ARTICLE.length;
  res.render('posts', { ARTICLE, postCounts: postLen });
});

router.get('/:title', (req, res) => {
  const postData = ARTICLE.find((post) => post.title === req.params.title);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('Title Not Found.');
    err.statusCode = 404;
    throw err;
    // Error 던짐 -> app.js 로
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newPost = {
        title: req.query.title,
        content: req.query.content,
      };
      ARTICLE.push(newPost);
      res.send('New article successfully entered.');
    } else {
      const err = new Error('Unexpected Query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      ARTICLE.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('Unexpected Foam');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const arrIndex = ARTICLE.findIndex(
      (post) => post.title === req.params.title
    );
    if (arrIndex !== -1) {
      const modify = {
        title: req.query.title,
        content: req.query.content,
      };
      ARTICLE[arrIndex] = modify;
      res.send('Article successfully Modified.');
    } else {
      res.end('There is no article has that title.');
    }
  } else {
    const err = new Error("Title or content doesn't entered.");
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  if (req.params.title) {
    const arrIndex = ARTICLE.findIndex(
      (post) => post.title === req.params.title
    );
    if (arrIndex !== -1) {
      ARTICLE.splice(arrIndex, 1);
      res.send('Article is ejected.');
    } else {
      res.end('There is no article has that title.');
    }
  } else {
    const err = new Error('Please enter the title.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
