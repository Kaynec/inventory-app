const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

const itemController = require("../controllers/itemController");

router.get("/", (req, res, next) => {
  res.render("home", { title: "Home Page " });
});

// The Categories 
router.get("/categories", categoryController.category_list);
// The Get form For a New Category
router.get("/categories/create", categoryController.category_create_get);

// The Post Form For Creating A Category 
router.post("/categories/create", categoryController.category_create_post); 


router.get("/categories/:id/delete", categoryController.category_delete_get);
router.post("/categories/:id/delete", categoryController.category_delete_post);

router.get("/categories/:id/update", categoryController.category_update_get);
router.post("/categories/:id/update", categoryController.category_update_post);

router.get("/categories/:id", categoryController.category_detail);









// 
// 
// The items 
router.get("/items", itemController.item_list);
// The Get form For a New Category
router.get("/items/create", itemController.item_create_get);

// The Post Form For Creating A Category 
router.post("/items/create", itemController.item_create_post); 


router.get("/items/:id/delete", itemController.item_delete_get);
router.post("/items/:id/delete", itemController.item_delete_post);

router.get("/items/:id/update", itemController.item_update_get);
router.post("/items/:id/update", itemController.item_update_post);

router.get("/items/:id", itemController.item_detail);


module.exports = router;
