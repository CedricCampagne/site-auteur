import Joi from "joi";

export const bookIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    slug: Joi.string().min(1).optional()
})