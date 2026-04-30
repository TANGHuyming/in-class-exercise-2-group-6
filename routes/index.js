const express = require("express");
const router = express.Router();

// GET home page
// router.get("/", (req, res) => {
//   res.render("index", {
//     title: "Express + Handlebars",
//     message: "Welcome to your Express Handlebars app!",
//   });
// });

// Login page
router.get("/", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

// Register page
router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register" });
});

// Dashboard

module.exports = router;
