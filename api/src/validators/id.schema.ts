import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required()
}).messages({
  "number.base": "L'identifiant doit être un nombre",
  "number.integer": "L'identifiant doit être un entier",
  "number.positive": "L'identifiant doit être un nombre positif",
  "any.required": "L'identifiant est obligatoire"
});
