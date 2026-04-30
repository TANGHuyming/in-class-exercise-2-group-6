const express = require("express");
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const publicController = require("../controller/publicController");

// login and register
router.get("/login", publicController.login);
router.get("/register", publicController.register);

router.post("/api/login", middlewares.login);
router.post("/api/register", middlewares.register);
router.post("/api/logout", publicController.logout);

// Home 
// router.get("/", publicController.home);
// router.get("/home", publicController.home);

// // CRUD records 
router.get("/api/records", publicController.getRecords);
router.post("/api/records", publicController.postRecords);
router.put("/api/records", publicController.putRecords);
router.delete("/api/records", publicController.deleteRecords);

// router.use(publicController.notFound);

module.exports = router;
