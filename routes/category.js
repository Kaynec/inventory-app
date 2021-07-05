const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", (req, res, next) => {
  res.render("home", { title: "Home Page " });
});

router.get("/categories", categoryController.category_list);

router.get("/categories/:id", categoryController.category_detail);

module.exports = router;
