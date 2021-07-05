#! /usr/bin/env node

console.log(
  "This script populates some test examples for the phone inventory app "
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");

// The Models
const Item = require("./models/item");
const Category = require("./models/category");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [];
const categories = [];

function itemCreate(name, description, image, category, cb) {
  const itemDetail = {
    name,
    description,
    image,
    category,
  };

  const item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, description, cb) {
  const category = new Category({ name, description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function CreateCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Samsung",
          "The Biggest Phone manufacturer in the world ",
          callback
        );
      },

      function (callback) {
        categoryCreate(
          "Xiaomi",
          "The Second Biggest Phone manufacturer in the world ",
          callback
        );
      },

      function (callback) {
        categoryCreate(
          "Apple ",
          "Once The biggest company in the world , still in top 3  ",
          callback
        );
      },

      function (callback) {
        categoryCreate(
          "LG",
          "This company stopped making phones this year",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function CreateItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Galaxy S21",
          "The Newest Flagship From Samsung with 108 MP Camera and Snapdragon 888 Chipset.",
          "https://www.mytrendyphone.eu/images/Samsung-Galaxy-S21-5G-128GB-Phantom-Grey-8806090892776-18012021-01-p.jpg",
          categories[0],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [CreateCategories, CreateItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("BOOKInstances: " + results);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
