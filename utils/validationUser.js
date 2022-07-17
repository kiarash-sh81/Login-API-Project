const Joi = require('@hapi/joi');


//? making new schema for invalidation registering
const UserSchema = Joi.object ({
    username: Joi.string().token().min(4).required(),//username include a-z , 0-9 , underscore
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

//? making new schema for invalidation logining
const loginUserSchema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required()
});

module.exports = {UserSchema , loginUserSchema};