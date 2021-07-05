const mongoose = require("mongoose");

const Category = require("../models/category");
const Item = require('../models/item')

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
    const category = results[0]
    const categoryItems = [...results.slice(1)]
    res.render('category_detail' , {title:'category_detail' , category , categoryItems,results})
  })
}