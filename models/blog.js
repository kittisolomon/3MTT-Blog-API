const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    author: {
       type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false
    },
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: Number,
        default: 0,
        required: true
    },

    tags: [String],
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

blogSchema.plugin(mongoosePaginate);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
