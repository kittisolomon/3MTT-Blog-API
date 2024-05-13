const Joi = require('joi');

const userSchema = Joi.object({
    firstname: Joi.string()
    .max(55)
    .trim()
    .required(),
    lastname: Joi.string()
    .max(255)
    .trim()
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) 
    .required(),
    password: Joi.string().required(),
    avatar_path: Joi.string()
    .allow(null)
    .optional()
});

async function createUserValidationMW(req, res, next) {
    try {
        await userSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.details[0].message });
    }
}

async function UpdateUserValidationMW(req, res, next) {
  
    try {
         await userSchema.validateAsync(req.body)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}


module.exports = {
    createUserValidationMW,
    UpdateUserValidationMW
};
