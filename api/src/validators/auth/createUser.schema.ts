import Joi from "joi";

export const createUserSchema = Joi.object({
   username: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
        "string.base": "Le nom d'utilisateur doit être une chaîne de caractères",
        "string.min": "Le nom d'utilisateur doit contenir au moins 2 caractères",
        "string.max": "Le nom d'utilisateur ne peut pas dépasser 50 caractères",
        "any.required": "Le nom d'utilisateur est obligatoire"
    }),

   email: Joi.string()
    .email().
    max(50)
    .required()
    .messages({
        "string.email": "L'adresse email n'est pas valide",
        "string.max": "L'adresse email ne peut pas dépasser 50 caractères",
        "any.required": "L'adresse email est obligatoire"
    }),

   password: Joi.string()
    .min(6).max(200)
    .required()
    .messages({
        "string.min": "Le mot de passe doit contenir au moins 6 caractères",
        "string.max": "Le mot de passe ne peut pas dépasser 200 caractères",
        "any.required": "Le mot de passe est obligatoire"
    }),

   is_active: Joi.boolean()
    .default(true)
    .messages({
        "boolean.base": "Le champ is_active doit être un booléen"
    })
});
