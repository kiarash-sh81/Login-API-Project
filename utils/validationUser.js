const Joi = require('@hapi/joi');



const UserSchema = Joi.object ({
    username: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

const loginUserSchema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required()
});

module.exports = {UserSchema , loginUserSchema};