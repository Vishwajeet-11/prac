const Joi = require("joi")

const registerSchema = Joi.object({
    name: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(4).max(10).required(),
    phone: Joi.string().pattern(new RegExp(/^\d{10}$/)).required()
})

module.exports = registerSchema