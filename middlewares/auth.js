const Blog = require('../models/blog');
const { isTokenValid } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticateUser(req, res, next) {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

      return res.status(401).json({ message: 'Unauthenticated' });

    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

      if (err) {

        return res.status(401).json({ message: 'Invalid Token' });

      } else {

        const { email, _id } = decodedToken;

        req.user = { email, _id };
       
        next();

      }
    });

  } catch (error) {
    
    return res.status(401).json({ message: 'Authentication Invalid' });
  }
}

async function authorizePermissions(req, res, next) {
    try {
      const blogId = req.params.id; 
      const blog = await Blog.findOne({ _id: blogId });
 
      if (!blog) {
        return res.status(404).json({
          message: 'Post not found'
        });
      }

      if (blog.author != req.user._id) {
        return res.status(403).json({
          message: 'Unauthorized to edit or delete this Post.'
        });
      }
      
      next();
    } catch (error) {
    
      return res.status(500).json({
        message: 'Internal Server Error' + error
      });
    }
};



module.exports = {
  authenticateUser,
  authorizePermissions,
};
