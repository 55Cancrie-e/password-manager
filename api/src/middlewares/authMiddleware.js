const { User } = require('../models/userModel');
const jwt = require('jsonwebtoken')
const {parsed: {SECRET_KEY}} = require('dotenv').config({path: './.env'});

const authicate = (req, res, next) => {
    let token = req.header('x-access-token');

    jwt.verify(token, SECRET_KEY, (err, decoced) => {
        if(err){
            res.status(401).send(err)
        } else {
            req.user_id = decoced._id
            next();
        }
    })
}



const authMiddleware = async(req, res, next) => {
    let refreshToken = req.headers['x-refresh-token'];
    let _id = req.headers['_id'];
    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if(!user){
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            })
        }
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if(session.token === refreshToken){
                if(User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true
                }
            }
        })

        if(isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch(err => {
        res.status(401).send(err)
    })
}


module.exports = {
    authMiddleware,
    authicate
}