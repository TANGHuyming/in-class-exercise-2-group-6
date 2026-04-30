const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const publicController = require("../controllers/public.controller");

// Home 
router.get("/", protect, publicController.home);
router.get("/home", protect, publicController.home);

router.get("/", protect, publicController.home);
router.get("/home", protect, publicController.home);


module.exports = router;
