import Joi from "joi";

export const updateUserSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().max(50).required(),

    // Password optionnel, mais si présent il doit respecter les règles
    password: Joi.string()
        .min(10)
        .max(200)
        .pattern(/[A-Z]/)
        .optional()
        .allow(""), // permet d'envoyer "" sans erreur

    is_active: Joi.boolean().required()
}).messages({
    "string.min": "Le champ doit contenir plus de caractères",
    "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule",
    "any.required": "Tous les champs obligatoires doivent être remplis"
});
