import Joi from "joi";

export const updateChronicleSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
            "string.base": "Le titre doit être une chaîne de caractères",
            "string.min": "Le titre doit contenir au moins 2 caractères",
            "string.max": "Le titre ne peut pas dépasser 255 caractères",
            "any.required": "Le titre est obligatoire"
        }),

    quote: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.base": "La citation doit être une chaîne de caractères",
            "string.min": "La citation doit contenir au moins 5 caractères",
            "any.required": "La citation est obligatoire"
        }),

    summary: Joi.string()
        .min(10)
        .required()
        .messages({
            "string.base": "Le résumé doit être une chaîne de caractères",
            "string.min": "Le résumé doit contenir au moins 10 caractères",
            "any.required": "Le résumé est obligatoire"
        }),

    content: Joi.string()
        .min(20)
        .required()
        .messages({
            "string.base": "Le contenu doit être une chaîne de caractères",
            "string.min": "Le contenu doit contenir au moins 20 caractères",
            "any.required": "Le contenu est obligatoire"
        }),

    cover_url: Joi.string()
        //helpers est un objet fourni par Joi sert à renvoyer des erreurs personnalisées
        .custom((value, helpers) => {
            if (!value.startsWith("http") && !value.startsWith("/")) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "any.invalid": "L’URL doit commencer par http ou /",
            "any.required": "L'URL de couverture est obligatoire",
            "string.base": "L'URL de couverture doit être une chaîne de caractères"
    }),


    published_at: Joi.date()
        .required()
        .messages({
            "date.base": "La date de publication doit être une date valide",
            "any.required": "La date de publication est obligatoire"
        }),

    is_active: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "Le statut doit être un booléen",
            "any.required": "Le statut actif/inactif est obligatoire"
        })
});

