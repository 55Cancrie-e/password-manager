const { User, userValidate, loginValidation } = require('../models/userModel')

const registerUser = (req, res, next) => {
    const { email, name, password } = req.body;
        // const { error } = userValidate(req.body)
        // if(error) {
        //     return res.status(403).send({
        //             message: error.details.message
        //         })
        //     }
        if (!email) {
          return res.status(400).send({
            message: 'Field useremail is empty',
          });
        }

        if(!name) {
            return res.status(400).send({
                message: 'Field username is empty',
              });
        }
      
        if (!password) {
          return res.status(400).send({
            message: 'Field password is empty',
          });
        }
        const user = new User({
          email: email,
          password: password,
          name: name
        });
        
        user
        .save()
        .then(() => {
           return user.createSession();
        }).then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return {accessToken, refreshToken}
            })
        }).then(authToken => {
            res
            .header('x-refresh-token', authToken.refreshToken)
            .header('x-access-token', authToken.accessToken)
            .status(200)
            .send({
                message: 'Success',
                user
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).send({
                message: 'Token was not created'
            })
        })
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // const { error } = loginValidation(req.body);
        // if(error){
        //     return res.status(401).send({
        //         message: error.details[0].message
        //     })
        // }

        if (!email) {
            return res.status(400).send({
            message: 'Incorrect email',
            });
        }

        if (!password) {
            return res.status(400).send({
            message: 'Incorrect password',
            });
        }

        await User.findByCredentials(email, password)
        .then((user) => {
            return user.createSession().then((refreshToken) => {
                return user.generateAccessAuthToken().then((accessToken) => {
                    return {accessToken, refreshToken}
                })
                }).then((authToken) => {
                    res
                    .header('x-refresh-token', authToken.refreshToken)
                    .header('x-access-token', authToken.accessToken)
                    .status(200)
                    .send({
                        message: 'Success',
                        user
                    })
                })
        }).catch(err => {
            console.log(err)
            return res.status(401).send({
                message: 'Token was not created'
            })
        })
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Not authorized'});
  }


}


module.exports = {
    registerUser,
    loginUser
}