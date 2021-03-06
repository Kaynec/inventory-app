const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

ItemSchema.virtual("url").get(function() {
  return "/items/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
