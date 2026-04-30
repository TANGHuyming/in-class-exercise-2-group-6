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
const { protect } = require("../middleware/authMiddleware");
const publicController = require("../controllers/public.controller");

// Home 
router.get("/", protect, publicController.home);
router.get("/home", protect, publicController.home);

router.get("/", protect, publicController.home);
router.get("/home", protect, publicController.home);


module.exports = router;
