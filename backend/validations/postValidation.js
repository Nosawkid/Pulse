import Joi from 'joi'

export const validateNewPost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().allow(""),
    imageUrl: Joi.string().allow("")
})