import Joi from "joi";

export const addCommentSchema = Joi.object({
    content: 
        Joi.string()
        .trim()
        .min(5)
        .max(1000)
        .required()
        .messages({
            "string.base": "Le contenu doit être une chaîne de caractères",
            "string.min": "Le contenu doit contenir au moins 5 caractères",
            "string.max": "Le contenu doit contenir au maximum 1000 caractères",
            "any.required": "Le contenu du commentaire est obligatoire"
        }),
    chronicle_id: 
        Joi.number()
        .integer()
        .positive()
        .strict()
        .required()
        .messages({
            "number.base": "L'identifiant de la chronique doit être un nombre",
            "number.integer": "L'identifiant de la chronique doit être un entier",
            "number.positive": "L'identifiant de la chronique doit être supérieur à 0",
            "any.required": "L'identifiant de la chronique est obligatoire",
            "number.strict": "L'identifiant de la chronique doit être un nombre et non une chaîne"
        })
});