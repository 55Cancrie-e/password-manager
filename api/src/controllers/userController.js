const { User, userValidate, loginValidation } = require('../models/userModel')


const getUserInfoAccessToken = (req, res, next) => {
    try{
       req.userObject.generateAccessAuthToken().then(accessToken => {
        res.header('x-access-token', accessToken).status(200).send({ accessToken })
       }).catch(err => {
        res.status(400).send(err)
       })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

const getUser = async(req, res, next) => {
    try {
        await User.findOne({ _id: req.user_id})
        .then(user => {
            if(user !== null){
                res.status(200).send({
                    email: user.email,
                    name: user.name
                })
            } else {
                res.status(403).json({ message: 'There is no user with this id' });
            }
        })
       } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    getUserInfoAccessToken,
    getUser
}