import Joi from "joi";

export const slugSchema = Joi.object({
    slug: Joi.string()
    .min(1)
    .required()
    .messages({
        "string.base": "Le slug doit être une chaîne de caractères",
        "string.empty": "Le slug est obligatoire",
        "string.min": "Le slug doit contenir au moins 1 caractère",
        "any.required": "Le slug est obligatoire"
    })
});