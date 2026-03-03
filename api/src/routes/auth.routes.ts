import { Router } from "express";

// Middlewares
import { validate } from "../middleware/validate";

// Validators
import { registerSchema } from "../validators/auth/register.schema";
import { loginSchema } from "../validators/auth/login.schema";

// Controllers
import { AuthController } from "../controllers/AuthController";

//Dto
import { RegisterParams } from "../dto/auth/RegisterParams.dto";
import { LoginParams } from "../dto/auth/LoginParams.dto";

const authRouter = Router();

authRouter.post<{}, {}, RegisterParams>("/register",validate(registerSchema, "body"), AuthController.register);
authRouter.post<{}, {}, LoginParams>("/login", validate(loginSchema,"body"),AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/me", AuthController.me);

export default authRouter;

