const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');

router.get('/api/login',
  middlewares.login,
  (req, res) => {
    const context = {
      title: 'Login',
      message: 'Please login to access the application'
    }
    res.render('login', context);
  }
)

// GET home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express + Handlebars',
    message: 'Welcome to your Express Handlebars app!'
  });
});

module.exports = router;
