import Joi from 'joi'

export const registerValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    dob: Joi.date().less(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)).message("User must be atleast 18 years old").required(),
    gender: Joi.string().valid("male", "female").required()
})


export const loginValidation = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().min(3).required()
})