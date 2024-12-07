const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const upload = require('../middleware/upload')


// Routes for handling Blog CRUD operations
router.post('/', upload.single('image'), createBlog); // Create Blog
router.get('/', getAllBlogs); // Get all Blogs
router.get('/:id', getBlogById); // Get a specific Blog by ID
router.put('/:id', upload.single('image'), updateBlog); // Update a Blog
router.delete('/:id', deleteBlog); // Delete a Blog

module.exports = router;
