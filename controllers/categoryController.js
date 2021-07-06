const mongoose = require("mongoose");


const Category = require("../models/category");
const Item = require('../models/item')

const { body,validationResult } = require("express-validator");

exports.category_list = function (req, res, next) {
  Category.find()
    .exec(function (err, categories) {
      if (err) {
        console.error(err);
      } else {
        //   Successful, so render
        res.render("category_list", {
          title: "All Categories",
          category_list: categories,
        });
      }
    });
};

exports.category_detail = function (req , res , next) {
  const CategoriesPromise = new Promise((resolve, reject) => {
    Category.findById({
      _id : req.params.id
    })
    .exec(function (err, categories){
      if (err){
        reject(err)
      }
      else {
        resolve(categories)
      }
    })
  });

  const ItemPromise = new Promise((resolve, reject) => { 
    Item.find(
      {
        category:req.params.id
      }
    )
    .exec(function (err, items){
      if (err){
        reject(err)
      }
      else {
        resolve(items)
      }
    })
  });

  Promise.all([CategoriesPromise,ItemPromise])
  .then(results=>{
    // console.log(results[1][0] )
    res.render('category_detail' , {title:'category_detail' ,results })
  })
}


exports.category_create_get = function(req,res,next){
  res.render('category_form' , {title:'create category' , errors:null})
}


exports.category_create_post = function(req, res , next) {
  body('name', 'name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('name', 'name must not be only a number').trim().isAlpha().escape(),
  body('description', 'description must not be empty.').trim().isLength({ min: 1 }).escape()
  body('description', 'description must not be only a number').trim().isAlpha().escape()

    const errors = validationResult(req);

    const category = new Category({
      name : req.body.name , 
      description : req.body.description
    })

    if (!errors.isEmpty()) {
      res.render('category_form' , {title:'create category' , errors:errors.array()})
    }

   else {
    category.save(function(err){
      if (err) next(err)
      res.redirect(category.url)
    })
  }
}

exports.category_create_delete = function(req , res , next) {
  
}