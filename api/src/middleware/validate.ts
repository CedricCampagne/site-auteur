import { Request, Response, NextFunction } from "express";
import { ValidationErrorItem } from "joi";

export const validate = (schema: any, property: "body" | "params" | "query") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail: ValidationErrorItem) => detail.message);
      return res.status(400).json({ error: messages });
    }
    
    next();
  };
};

