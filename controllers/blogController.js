const wordCount = require('word-count');
const logger = require('../utils/logger');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function createBlog(req, res) {
    try {
        const { title, description, author, state, read_count, reading_time, tags, body } = req.body;

        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({ message: 'Title must be unique' });
        }
     
        const readingTime = await readingTimeCalculator(body);

        const newBlog = new Blog({
            title,
            description,
            author,
            state, 
            read_count,
            reading_time: parseInt(readingTime),
            tags,
            body,
            timestamp: Date.now()
        });

        await newBlog.save();

        logger.info('Post created successfully');
        res.status(201).json({ message: 'Post created successfully', blog: newBlog });
    } catch (error) {
        logger.error('Error creating blog: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getAllBlogs(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        let sort = {};

        sort = {
                read_count: -1, 
                reading_time: 1, 
                timestamp: -1 
        };
        
        const options = {
            page,
            limit,
            sort
        };

        const blogs = await Blog.paginate({}, options);

        await User.populate(blogs.docs, { path: 'author', select: 'firstname lastname -_id' });

        logger.info('All posts successfully fetched');
        res.status(200).json({ blogs });
    } catch (error) {
        logger.error('Error fetching posts: ', error);
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function getMyBlogs(req, res) {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const options = {
            page,
            limit,
        };

        const blogs = await Blog.paginate({ author: userId }, options);

        await User.populate(blogs.docs, { path: 'author', select: 'firstname lastname -_id' });

        logger.info('User posts successfully fetched');
        res.status(200).json({ blogs });
    } catch (error) {
        logger.error('Error fetching user posts: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function viewSingleBlog(req, res) {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId).populate('author', 'firstname lastname');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.read_count += 1;
        await blog.save();

        logger.info('Post successfully fetched');
        res.status(200).json({ blog });
    } catch (error) {
        logger.error('Error fetching post: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function updateBlog(req, res) {
    try {
        const blogId = req.params.id;
        const { title, description, state, tags,  body } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, description, state, tags,  body  }, { new: true });
        
    if (!updatedBlog) {
            return res.status(404).json({ message: 'Post not found' });
        }

        logger.info('Post updated successfully');
        res.status(200).json({ message: 'Post updated successfully', blog: updatedBlog });
     } catch (error) {
        logger.error('Post was not be updated: ', error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteBlog(req, res) {
    try {

        const blogId = req.params.id;
        console.log(blogId)
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        logger.info('Post deleted successfully');
        res.status(200).json({ message: 'Post deleted successfully', blog: deletedBlog });
    } catch (error) {
        logger.error('Post was not deleted: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

async function searchBlog(req, res) {
    try {
        const { author, title, tags } = req.query;

        const searchCriteria = {};

        if (author) {
            searchCriteria.author = { $regex: author, $options: 'i' };
        }
        if (title) {
            searchCriteria.title = { $regex: title, $options: 'i' };
        }
        if (tags) {
            searchCriteria.tags = { $regex: tags, $options: 'i'  };
        }

        const searchResult = await Blog.find(searchCriteria);

        logger.info('Searched result retrieved: ');
        res.status(200).json({ result: searchResult });
    } catch (error) {
        logger.error('Error occurred: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




async function readingTimeCalculator(content, wpm = 20) {
 
    const numWords = wordCount(content);

    const readingTime = Math.round(numWords / wpm);

    return readingTime;
}


module.exports = {
    createBlog,
    getAllBlogs,
    viewSingleBlog,
    getMyBlogs,
    updateBlog,
    deleteBlog,
    searchBlog
};
