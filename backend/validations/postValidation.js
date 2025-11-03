import Joi from 'joi'
import JoiObjectId from 'joi-objectid'

Joi.objectId = JoiObjectId(Joi)

export const validateNewPost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().allow(""),
    imageUrl: Joi.string().allow("")
})


export const validateLikes = Joi.object({
    postId: Joi.objectId().required(),
    userId: Joi.objectId().required()
})