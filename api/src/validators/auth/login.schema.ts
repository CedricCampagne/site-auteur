import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
}).messages({
     "any.required": "Tous les champs sont obligatoires"
})
