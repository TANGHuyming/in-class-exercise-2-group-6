const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const publicController = require("../controllers/public.controller");


router.get("/register ", publicController.showLogin);
router.get("/login", publicController.showRegister);          // return JWT

// Home 
router.get("/", protect, publicController.home);
router.get("/home", protect, publicController.home);

// CRUD records 
router.get("/api/records", protect, publicController.getRecords);
router.post("/api/records", protect, publicController.postRecords);
router.put("/api/records", protect, publicController.putRecords);
router.delete("/api/records", protect, publicController.deleteRecords);

router.use(publicController.notFound);

module.exports = router;
