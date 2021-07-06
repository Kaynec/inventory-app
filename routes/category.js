const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", (req, res, next) => {
  res.render("home", { title: "Home Page " });
});

router.get("/categories", categoryController.category_list);
// The Get form For a New Category
router.get("/categories/create", categoryController.category_create_get);

// The Post Form For Creating A Category 
router.post("/categories/create", categoryController.category_create_post); 


router.get("/categories/:id", categoryController.category_detail);



module.exports = router;
