const express = require('express');
const { getUserInfoAccessToken } = require('../controllers/userController');


const router = express.Router();

router.get('/me/access-token', getUserInfoAccessToken)


module.exports = {
    userRouter: router
}