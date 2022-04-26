const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product's name"],
    maxlength: [100, "Name can not exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product's price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product's description"],
    maxlength: [1000, "Description can not exceed 1000 characters"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  category: {
    type: String,
    required: [true, "Please provide product's category"],
    enum: ["office", "kitchen", "bedroom"],
  },
  company: {
    type: String,
    required: [true, "Please provide product's company"],
    enum: {
      values: ["ikea", "liddy", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  colors: {
    type: [String],
    default:['#222'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  inventory: {
    type: Number,
    required:true,
    default:15,
  },
  averageRating: {
    type: Number,
    default:0,
  },
  user: {
      type:mongoose.Types.ObjectId,
      ref:'User',
      required:true
  }
},{timestamps:true});

module.exports = mongoose.model("Product", ProductSchema);