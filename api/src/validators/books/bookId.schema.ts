import Joi from "joi";

export const bookIdSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "L'identifiant doit être un nombre",
            "number.integer": "L'identifiant doit être un entier",
            "number.positive": "L'identifiant doit être positif",
            "any.required": "L'identifiant est obligatoire"
        }),

    slug: Joi.string()
        .pattern(/^[a-z0-9-]+$/)
        .required()
        .messages({
            "string.base": "Le slug doit être une chaîne de caractères",
            "string.empty": "Le slug ne peut pas être vide",
            "string.pattern.base": "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets",
            "any.required": "Le slug est obligatoire"
        })
});
