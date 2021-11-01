const router = require('express').Router();
const e = require('express');
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const Post = require('../models/Post');


router.get('/', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  Post.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT username
            FROM User AS u
            WHERE u.id = post.user_id
          )`),
          'username'
        ]
      ]
    },
    raw: true
  })
    .then(allPosts => {
      res.render('homepage', { allPosts, isLoggedIn })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (isLoggedIn) {
    res.redirect('/');
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (isLoggedIn) {
    res.redirect('/');
  }
  res.render('signup');
});

router.get('/dashboard', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (!isLoggedIn) {
    res.redirect('/login');
  }

  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    raw: true
  })
    .then(myPosts => {
      res.render('dashboard', { myPosts })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/create-a-post', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (!isLoggedIn) {
    res.redirect('/login');
  }
  let userId = req.session.user_id;
  res.render('create-a-post', { userId });
});

router.get('/edit-post', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (!isLoggedIn) {
    res.redirect('/login');
  }
  
  Post.findOne({
    where: {
      id: req.query.post_id
    },
    raw: true
  })
    .then(post => {
      console.log(post)
      res.render('edit-post', { post })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;