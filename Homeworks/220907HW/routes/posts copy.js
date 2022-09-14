// @ts-check

const express = require('express');

const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://victory-soo:zxc01234@cluster0.zt1kzsb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db('board').collection('post');
  // perform actions on the collection object
  client.close();
});

// const ARTICLE = [
//   {
//     title: 'title1',
//     content: 'content1',
//   },
//   {
//     title: 'title2',
//     content: 'content2',
//   },
// ];

router.get('/', (req, res) => {
  const postLen = ARTICLE.length;
  res.render('posts', { ARTICLE, postCounts: postLen });
});

router.get('/add', (req, res) => {
  res.render('add', {});
});

router.get('/modify/:title', (req, res) => {
  const contentName = ARTICLE.find(
    (post) => post.title === req.params.title
  ).content;
  res.render('modify', { titleName: req.params.title, contentName });
});

router.post('/title/:title', (req, res) => {
  if (req.body.title) {
    const arrIndex = ARTICLE.findIndex(
      (post) => post.title === req.params.title
    );
    if (arrIndex !== -1) {
      const modify = {
        title: req.body.title,
        content: req.body.content,
      };
      ARTICLE[arrIndex] = modify;
      res.redirect('/posts');
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
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
      const err = new Error('Unexpected Form');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
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
