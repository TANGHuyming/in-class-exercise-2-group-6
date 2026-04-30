const express = require("express");
const router = express.Router();
const { getFuelSummaryContext } = require("../utils/fuelSummary");

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

router.get("/dashboard", (req, res) => {
  const { data } = require("../data.js"); // replace with API call later
  res.render("dashboard/dashboard", getFuelSummaryContext(data));
});

// router.get("/statistics", (req, res) => {
//   const { data } = require("../data.js"); // replace with API call later
//   res.render("dashboard/statistics", getFuelSummaryContext(data));
// });

// Dashboard

module.exports = router;
