// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  
  },
  paragraph: {
    type: String,
  
  },
  author: {
    type: String,
  
  },
  date: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
  
  },
  image: {
    type: String,  // You can store image URL or image path
  },
});

module.exports  = mongoose.model("Blog", blogSchema);
