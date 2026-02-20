import Joi from "joi";

export const addCommentSchema = Joi.object({
    content: Joi.string().trim().min(5).max(1000).required(),
    chronicle_id: Joi.number().integer().positive().strict().required()
});