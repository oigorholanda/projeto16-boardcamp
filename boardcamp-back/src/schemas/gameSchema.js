import Joi from "joi"

export const gameSchema = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string(),
    stockTotal: Joi.number().required(),
    pricePerDay: Joi.number().greater(0).required()
}) 