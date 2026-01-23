import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).max(200).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).max(200).required()
})