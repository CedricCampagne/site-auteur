import Joi from "joi";

export const updateUserSchema = Joi.object({
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
        .max(50)
        .required()
        .messages({
            "string.base": "L'email doit être une chaîne de caractères",
            "string.email": "L'email doit être valide",
            "string.empty": "L'email est obligatoire",
            "string.max": "L'email ne peut pas dépasser 50 caractères",
            "any.required": "L'email est obligatoire"
        }),

    // Password optionnel, mais si présent il doit respecter les règles
    password: Joi.string()
        .min(10)
        .max(200)
        .pattern(/[A-Z]/)
        .optional()
        .allow("")  // permet d'envoyer "" sans erreur
        .messages({
            "string.base": "Le mot de passe doit être une chaîne de caractères",
            "string.min": "Le mot de passe doit contenir au moins 10 caractères",
            "string.max": "Le mot de passe ne peut pas dépasser 200 caractères",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule"
        }),

    is_active: Joi.boolean()
    .required()
    .messages({
        "boolean.base": "Le statut actif doit être un booléen",
        "any.required": "Le statut actif est obligatoire"
    })
});
