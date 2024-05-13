const express = require('express');
const blogRouter = express.Router();

const {  createBlog, getAllBlogs, viewSingleBlog, getMyBlogs, updateBlog, deleteBlog, searchBlog } = require('../controllers/blogController');
const { authenticateUser, authorizePermissions } = require('../middlewares/auth');
const { createValidationBlogMW, editValidationBlogMW } = require("../middlewares/blogValidation");


blogRouter.get('/blogs', getAllBlogs); 
blogRouter.get('/my-blogs', authenticateUser, getMyBlogs);
blogRouter.post('/add-blog', [authenticateUser, createValidationBlogMW ], createBlog);
blogRouter.put('/edit-blog/:id', [authenticateUser, authorizePermissions, editValidationBlogMW], updateBlog );
blogRouter.get('/single-blog/:id', viewSingleBlog);
blogRouter.delete('/delete-blog/:id', [authenticateUser, authorizePermissions], deleteBlog);
 
blogRouter.get('/search-blog', searchBlog);


module.exports = blogRouter;