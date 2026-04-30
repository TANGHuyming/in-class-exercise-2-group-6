const express = require('express');
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express + Handlebars',
    message: 'Welcome to your Express Handlebars app!'
  });
});

module.exports = router;
