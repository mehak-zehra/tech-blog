const router = require('express').Router();
const Post = require('../models/Post');
const moment = require("moment");

// create a blog post
router.post('/', (req, res) => {
  let today     = moment().format("MM-DD-YYYY");
  let payload = {
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id,
    date: today,
  };

  Post.create(payload)
    .then(dbUserData => {
      res.redirect("/")
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a blog post
router.post('/:id', (req, res) => {
  let today     = moment().format("MM-DD-YYYY");
  let payload = {
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id,
    date: today,
  };
  console.log("herere")
  // Post.update(payload)
  //   .then(dbUserData => {
  //     res.redirect("/")
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

module.exports = router;