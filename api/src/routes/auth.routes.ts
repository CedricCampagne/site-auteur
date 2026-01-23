import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate } from "../middleware/validate";
import { registerSchema } from "../validators/auth/register.schema";
import { loginSchema } from "../validators/auth/login.schema";

const authRouter = Router();

authRouter.post("/register",validate(registerSchema, "body"), AuthController.register);
authRouter.post("/login", validate(loginSchema,"body"),AuthController.login);

export default authRouter;

