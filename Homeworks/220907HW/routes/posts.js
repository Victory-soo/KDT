// @ts-check

const express = require('express');

const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://victory-soo:zxc01234@cluster0.zt1kzsb.mongodb.net/?retryWrites=true&w=majority';

const mongoClient = require('./mongo');

router.get('/', async (req, res) => {
  // [Callback]
  // MongoClient.connect(uri, (err, db) => {
  //   const data = db.db('board').collection('post');
  //   data.find({}).toArray((err, result) => {
  //     const ARTICLE = result;
  //     const postLen = ARTICLE.length;
  //     res.render('posts', { ARTICLE, postCounts: postLen });
  //   });
  // });

  // [async await]
  const client = await mongoClient.connect();
  const cursor = client.db('board').collection('post');
  const ARTICLE = await cursor.find({}).toArray();
  const postCounts = ARTICLE.length;
  res.render('posts', { ARTICLE, postCounts });
});

router.get('/add', (req, res) => {
  res.render('add', {});
});

router.get('/modify/:title', (req, res) => {
  MongoClient.connect(uri, (err, db) => {
    const data = db?.db('board').collection('post');

    data.findOne({ title: req.params.title }, (err, result) => {
      if (err) {
        throw err;
      } else {
        const titleName = result.title;
        const contentName = result.content;
        res.render('modify', { titleName, contentName });
      }
    });
  });
});

router.post('/title/:title', async (req, res) => {
  if (req.body.title) {
    // [Callback]
    // MongoClient.connect(uri, (err, db) => {
    //   const data = db?.db('board').collection('post');
    //   data?.updateOne(
    //     { title: req.params.title },
    //     {
    //       $set: {
    //         title: req.body.title,
    //         content: req.body.content,
    //       },
    //     },
    //     (err, result) => {
    //       if (err) {
    //         throw err;
    //       } else {
    //         res.redirect('/posts');
    //       }
    //     }
    //   );
    // });

    // [async await]
    const client = await mongoClient.connect();
    const cursor = client.db('board').collection('post');
    await cursor.updateOne(
      { title: req.params.title },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      }
    );
    res.redirect('/posts');
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', async (req, res) => {
  if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };

      // [Callback]
      // MongoClient.connect(uri, (err, db) => {
      //   const data = db?.db('board').collection('post');
      //   data.insertOne(newPost, (err, result) => {
      //     if (err) {
      //       throw err;
      //     } else {
      //       res.redirect('/posts');
      //     }
      //   });
      // });

      // [async await]
      const client = await mongoClient.connect();
      const cursor = client.db('board').collection('post');
      await cursor.insertOne(newPost);
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

router.delete('/:title', async (req, res) => {
  // [Callback]
  // MongoClient.connect(uri, (err, db) => {
  //   const data = db?.db('board').collection('post');
  //   data?.deleteOne({ title: req.params.title }, (err, result) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       res.redirect('/posts');
  //     }
  //   });
  // });

  // [async awiat]
  const client = await mongoClient.connect();
  const cursor = client.db('board').collection('post');
  const result = await cursor.deleteOne({ title: req.params.title });
  if (result.acknowledged) {
    res.redirect('/post');
  } else {
    const err = new Error('Delete Failed');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
