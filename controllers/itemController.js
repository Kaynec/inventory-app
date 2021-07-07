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
   .populate('category')
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


exports.item_create_get =async function(req,res,next){
 const categories = await  Category.find()
 res.render('item_create' , {title:"item create" , item:{} ,  errors:null , categories})
}

exports.item_create_post = [
   body('name').trim().isLength({ min: 1 }).escape().withMessage('name must be specified.'),
   body('description').trim().isLength({ min: 1 }).escape().withMessage("description can't be empty. "),
   body('image').trim().isLength({ min: 1 }).escape().withMessage('image must be specified.').isURL().withMessage('image url must be a valid url'),
   body('select.*').escape(),


  async (req, res, next) => {

   const categories = await Category.find()
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Create Author object with escaped and trimmed data
      const item = new Item(
          {
            name : req.body.name ,
            description : req.body.description ,
            image : req.body.image ,
            // select is the name for the ejs category select option
            category:req.body.select 
          }
      );

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/errors messages.
          const categories = await  Category.find()
          res.render('item_create', { title: 'Create Author', item , errors:errors.array() , categories });
      }
      else {

          await item.save()
          res.redirect(item.url);
      }
  }
]

exports.item_delete_get = async function(req , res , next) {
   const item = await Item.findById(req.params.id) 
   res.render('item_delete' , {title:'Delete Item' , item , err:null })
}

exports.item_delete_post = async function(req , res , next) {

  try {
   if (req.body.password == 11111111) {
       Item.findByIdAndRemove(req.params.id)
       .exec(err=>{
          res.redirect('/items')
       })
      }
   
      else {
         const item = await Item.findById(req.params.id) 
         res.render('item_delete' , {title:'Delete Item' , item , err:"Wrong Password" })
      }
  }

  catch(err) {
     return next(err)
  }
}

exports.item_update_get =  async function(req , res , next) {
   const item = await Item.findById(req.params.id) 
   res.render('item_update' , {title:'Delete Item' , item , err:null })
}

exports.item_update_post = async function(req , res , next) {
 
   try {
      if (req.body.password == 11111111) {

         const item = {
            name:req.body.name ,
            description : req.body.description ,
            image : req.body.image 
         }
          Item.findByIdAndUpdate(req.params.id , item , (err)=> {
             if (err) next(err)

             res.redirect('/items')
          })
          
         }
      
         else {
            const item = await Item.findById(req.params.id) 
            res.render('item_delete' , {title:'Delete Item' , item , err:"Wrong Password" })
         }
     }
   
     catch(err) {
        return next(err)
     }

}