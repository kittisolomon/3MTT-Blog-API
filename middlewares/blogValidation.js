const Joi = require('joi');

const blogAddSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    author: Joi.string().required(),
    state: Joi.string().valid('draft', 'published').default('draft'),
    read_count: Joi.number().integer().min(0).default(0),
    reading_time: Joi.number().integer().min(0),
    tags: Joi.array().items(Joi.string()),
    body: Joi.string().required(),
    timestamp: Joi.date().default(Date.now)
});

const blogEditSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    author: Joi.string(),
    state: Joi.string().valid('draft', 'published'),
    read_count: Joi.number().integer().min(0),
    reading_time: Joi.number().integer().min(0),
    tags: Joi.array().items(Joi.string()),
    body: Joi.string(),
});


async function createValidationBlogMW(req, res, next) {
    try {
        await blogAddSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.details[0].message });
    }
}

async function editValidationBlogMW(req, res, next) {
    try {
        await blogEditSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.details[0].message });
    }
}

module.exports = {
    createValidationBlogMW,
    editValidationBlogMW
};
