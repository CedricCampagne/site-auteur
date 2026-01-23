import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string()
        .min(10)
        .max(200)
        .pattern(/[A-Z]/)
        .required()
}).messages({
    "string.min": "Le mot doit contenir au moins 10 caracteres",
    "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule",
    "any.required": "Tous les champs sont obligatoires"
})


