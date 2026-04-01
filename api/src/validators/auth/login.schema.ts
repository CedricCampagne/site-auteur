import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
        "string.base": "L'email doit être une chaîne de caractères",
        "string.email": "L'email doit être valide",
        "string.empty": "L'email est obligatoire",
        "any.required": "L'email est obligatoire"
    }),
    password: Joi.string()
    .required()
    .messages({
        "string.base": "Le mot de passe doit être une chaîne de caractères",
        "string.empty": "Le mot de passe est obligatoire",
        "any.required": "Le mot de passe est obligatoire"
    })
});
