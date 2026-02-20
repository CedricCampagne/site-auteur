import { Router } from "express";

// Middlewares
import { validate } from "../middleware/validate";

// Validators
import { registerSchema } from "../validators/auth/register.schema";
import { loginSchema } from "../validators/auth/login.schema";

// Controllers
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/register",validate(registerSchema, "body"), AuthController.register);
authRouter.post("/login", validate(loginSchema,"body"),AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/me", AuthController.me);

export default authRouter;

