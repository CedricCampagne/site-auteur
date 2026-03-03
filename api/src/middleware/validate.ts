import { Request, Response, NextFunction } from "express";
import { ValidationErrorItem } from "joi";
import { ObjectSchema } from "joi";

export const validate = <
  TParams = any,
  TresBody = any,
  TReqBody = any,
  TQuery = any
> (
  schema: ObjectSchema,
  property: "body" | "params" | "query"
) => {
  return (
    req: Request<TParams, TresBody, TReqBody, TQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true
    });

    if (error) {
      const messages = error.details.map((detail: ValidationErrorItem) => detail.message);
      console.log("erreur joi", messages)
      return res.status(400).json({ error: messages });
    }

    // Important : on remplace les données par celles nettoyées
    req[property] = value;
    next();
  };
};