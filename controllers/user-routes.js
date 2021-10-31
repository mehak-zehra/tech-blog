const router = require('express').Router();
const User = require('../models/User');

router.post('/login', (req, res) => {
  
  User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username!' });
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
      }

      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.firstname = dbUserData.first_name;
        req.session.loggedIn = true;
  
        res.redirect("/")
      });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      res.redirect("/")
    }
    else {
      res.status(404).end();
    }
});

router.post('/signup', (req, res) => {
  
  let payload = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };
  
  User.create(payload)
  .then(dbUserData => {
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.firstname = dbUserData.first_name;
      req.session.loggedIn = true;

      res.redirect("/")
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;