import "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: any; // tu pourras typer mieux plus tard
    }
}
