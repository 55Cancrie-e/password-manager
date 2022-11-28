const { Schema, model, default: mongoose } = require('mongoose');
const {parsed: {SECRET_KEY, ENCODE_ROUNDS}} = require('dotenv').config({path: './.env'});
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')
const Joi = require('joi');
const crypto = require('crypto');
const { string } = require('joi');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
})


const userValidate = user => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(4).max(20).required(),
        name: Joi.string()
    })

    return schema.validate(user)
}

const loginValidation = user => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(4).max(20).required()
    })

    return schema.validate(user)
}

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['password', 'sessions'])
}

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        jwt.sign({_id: user._id.toHexString()}, SECRET_KEY, { expiresIn: '10m'}, (err,  token) => {
            if(!err){
                resolve(token)
            } else {
                reject()
            }
        })
    })
}

UserSchema.methods.generateRefreshAuthToken = function () {
    // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                // no error
                let token = buf.toString('hex');

                return resolve(token);
            }
        })
    })
}


UserSchema.methods.createSession = function () {
    let user = this;

    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database.\n' + e);
    })
}


UserSchema.statics.findByIdAndToken = function(_id, token) {
    const User = this;

    return User.findOne({
        _id,
        'sessions.token': token
    })
}

UserSchema.statics.findByCredentials = function(email, password){
    let User = this;
    return User.findOne({ email }).then(user => {
        if(!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) resolve(user);
                else {
                    reject()
                }
            })
        })
    })
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if(expiresAt > secondsSinceEpoch) {
        return false;
    } else {
        return true;
    }
}

UserSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(+ENCODE_ROUNDS, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

let saveSessionToDatabase = (user, refreshToken) => {
    // Save session to database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({ 'token': refreshToken, expiresAt });

        user.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    })
}


let generateRefreshTokenExpiryTime = () => {
    let daysUtilExpire = '10';
    let secondUntilExpire = ((daysUtilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondUntilExpire)
}

const User = model('userPassword', UserSchema);

module.exports = {
    User,
    userValidate,
    loginValidation
}