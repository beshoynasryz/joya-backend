const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

// Create a new Blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, paragraph, author, link } = req.body;

  // Handle image upload (if provided)
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Create a new blog post
  const blog = new Blog({
    title,
    paragraph,
    author,
    link,
    image, // Add image if uploaded
  });

  // Save the blog to the database
  const createdBlog = await blog.save();

  res.status(201).json(createdBlog);
});

// Get all Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

// Get a specific Blog by ID
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.status(200).json(blog);
});

// Update a Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, paragraph, author, link } = req.body;

  // Handle image upload (if provided)
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Find the blog by ID
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Update fields with new data (or keep the existing data)
  blog.title = title || blog.title;
  blog.paragraph = paragraph || blog.paragraph;
  blog.author = author || blog.author;
  blog.link = link || blog.link;
  blog.image = image || blog.image; // Update image if uploaded

  // Save the updated blog
  const updatedBlog = await blog.save();

  res.status(200).json(updatedBlog);
});

// Delete a Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
  
    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }
  
    res.status(200).json({ message: 'Blog deleted successfully' });
  });
  

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
