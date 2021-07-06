const mongoose = require("mongoose");
const Category = require('../models/category')
const Item = require('../models/item')

const { body,validationResult } = require("express-validator");

exports.item_list =  function (req, res, next) {
    Item.find()
    .exec(function (err, items) {
      if (err) next(err) 
      
      else {
        //   Successful, so render
        res.render("item_list", {
          title: "All items",
          items
        });
      }
    });
};

exports.item_detail = function (req , res , next) {
   Item.findById(req.params.id)
   .exec((err , item)=>{
       if (err) next(err)

       else {
        res.render("item_detail", {
            title: "1 item",
            item
          });
       }
   })
}


exports.item_create_get = function(req,res,next){
   res.render('DUDE WTF')
}

exports.item_create_post = function(req, res , next) {
   res.render('DUDE WTF')
}

exports.item_delete_get = function(req , res , next) {
   res.render('DUDE WTF')
}

exports.item_delete_post = function(req , res , next) {
   res.render('DUDE WTF')
}

exports.item_update_get = function(req , res , next) {
   res.render('DUDE WTF')
}

exports.item_update_post = function(req , res , next) {
   res.render('DUDE WTF')
}