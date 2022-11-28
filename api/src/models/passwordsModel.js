const { Schema, model, default: mongoose } = require('mongoose');
const Joi = require('joi');


const PasswordSchema = new Schema({
    name: {
       type: String,
       require: true,
       index: true
    },
    password: {
        type: String,
        require: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createDate: {
        type: String,
        default: new Date().toISOString()
    }
})


const passwordItemVlidation = item => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(4).required(),
    })

    return schema.validate(item)
}

const PasswordItem = model('passwordItem', PasswordSchema);


module.exports = {
    PasswordItem,
    passwordItemVlidation
}