const router = require('express').Router();
const moment = require("moment");

const Post = require('../models/Post');

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
    .then(data => {
      res.redirect("/dashboard")
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a blog post
router.put('/:id', (req, res) => {
  
  Post.update(
    { 
      title: req.body.title, 
      content: req.body.content
    },
    { where: { id: req.params.id } }
  )
    .then(data => {
      res.status(200).json("successfully updated post with id" + req.params.id)

    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a blog post
router.delete('/:id', (req, res) => {
  let postId = req.params.id;
  
  Post.destroy({
    where: {
      id: postId
    }
  }).then(data => {
      res.status(200).json("successfully deleted post with ID : " + postId)
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;