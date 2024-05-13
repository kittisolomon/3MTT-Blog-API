const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

function createToken(userData) {
   
    const token = jwt.sign(userData, secret , { expiresIn: '1h' });
    return token; 
}

//console.log('create: ', token)

function attachCookiesToResponse({ res, token }) {
    res.cookie('token', token, { 
        httpOnly: true, 
        signed: true,
        maxAge: 3600000 
    });
}

module.exports = {
    createToken,
    attachCookiesToResponse
};
