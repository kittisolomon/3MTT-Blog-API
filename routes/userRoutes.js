const express = require('express');
const authRouter = express.Router();

const { registerUser,loginUser, logoutUser } = require('../controllers/authController');
const { createUserValidationMW,  } = require("../middlewares/userValidation");
const { authenticateUser } = require('../middlewares/auth');



authRouter.post('/register',createUserValidationMW, registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout', authenticateUser, logoutUser);

module.exports = authRouter;