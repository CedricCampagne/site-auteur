import Joi from "joi";

export const addCommentSchema = Joi.object({
    content: Joi.string().min(5).max(1000).required(),
    chronicle_id: Joi.number().integer().positive().required
});