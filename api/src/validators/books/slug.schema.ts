import Joi from "joi";

export const slugSchema = Joi.object({
    slug: Joi.string().min(1).required()
});