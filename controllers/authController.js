const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const path = require('path');
const { createToken, attachCookiesToResponse } = require('../utils/jwt');


const secret = process.env.JWT_SECRET;

async function registerUser(req, res) {
   try {
 
    const { firstname, lastname, email, password } = req.body;

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            logger.error(`${email} Already Exist!!!`);
            return res.status(409).json({
                message: `${email} Already Exist!!!`
            });
        }
      
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
           
        });

        logger.info('Registration Successful');
        return res.status(201).json({ 
            message: 'Registration Successful',
            user: user 
        });
    } catch (error) {
           logger.error('Error occured: ', error);
        return res.status(500).send(error);
    }
}


async function loginUser(req, res) {

	 const { email, password } = req.body;

        if (!email || !password) {

            logger.error('Please provide Email and Password');
            return res.status(400).json({
                message: 'Please provide Email and Password'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            logger.error('Invalid User Credentials!!!');
            return res.status(401).json({
                message: 'Invalid User Credentials!!!'
            });
        }

        const passwordCorrect = await user.comparePassword(password);

        if (!passwordCorrect) {
            logger.error('Invalid User Credentials!!!');
            return res.status(401).json({
                message: 'Invalid User Credentials!!!'
            });
        }

        const userData = {
            _id: user._id,
            email: user.email 
        };

        const userToken = createToken(userData);
        req.user = { email:user.email, _id: user._id };

        attachCookiesToResponse({ res, token: userToken });
        
        logger.info('Login Successful');
        res.status(200).json({ 
            message: 'Login Successful',
            user: userToken 
        });
} 

async function logoutUser(req, res) {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            signed: true, 
        });

        logger.info('Logout Successful');
        res.status(200).json({ message: 'Logout Successful' });
    } catch (error) {
        logger.error('Error Occured: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};