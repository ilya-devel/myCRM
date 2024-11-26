const Joi = require("joi");

const loginScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[\\d\\w]{8,30}$'))
        .required(),
})

const signInScheme = Joi.object({
    username: Joi.string()
        .pattern(new RegExp('^[\\d\\w]{8,30}$'))
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[\\d\\w]{8,30}$'))
        .required(),
    confirmPassword: Joi.ref('password'),
})

module.exports = { loginScheme, signInScheme }
