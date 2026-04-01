import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "Le nom d'utilisateur doit être une chaîne de caractères",
            "string.empty": "Le nom d'utilisateur est obligatoire",
            "string.min": "Le nom d'utilisateur doit contenir au moins 2 caractères",
            "string.max": "Le nom d'utilisateur ne peut pas dépasser 50 caractères",
            "any.required": "Le nom d'utilisateur est obligatoire"
            }),
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
        .min(10)
        .max(200)
        .pattern(/[A-Z]/)
        .required()
        .messages({
            "string.base": "Le mot de passe doit être une chaîne de caractères",
            "string.empty": "Le mot de passe est obligatoire",
            "string.min": "Le mot de passe doit contenir au moins 10 caractères",
            "string.max": "Le mot de passe ne peut pas dépasser 200 caractères",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule",
            "any.required": "Le mot de passe est obligatoire"
        })
});


