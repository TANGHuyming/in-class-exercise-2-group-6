const express = require("express");
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const publicController = require("../controllers/public.controller");

// login and register
router.get("/login", publicController.login);
router.get("/register", publicController.register);

router.post("/login", middlewares.login);
router.post("/register", middlewares.register);
router.post("/api/logout", publicController.logout);

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
