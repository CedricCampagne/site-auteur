import Joi from "joi";

export const updateCommentSchema = Joi.object({
    content: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.base": "Le contenu doit être une chaîne de caractères",
            "string.min": "Le contenu doit contenir au moins 2 caractères",
            "any.required": "Le contenu du commentaire est obligatoire"
        }),

    is_visible: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "Le champ is_visible doit être un booléen",
            "any.required": "Le champ is_visible est obligatoire"
        })
});
