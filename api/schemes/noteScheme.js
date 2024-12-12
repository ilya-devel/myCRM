const Joi = require("joi");

const noteScheme = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    isComplete: Joi.boolean()
})

module.exports = { noteScheme }