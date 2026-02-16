import { Router } from "express";
import { authGuard } from "../middleware/authGuard";
import { isAdmin } from "../middleware/isAdmin";
import { ChroniclesController } from "../controllers/ChroniclesController";
import { UsersController } from "../controllers/UsersController";
import { updateUserSchema } from "../validators/auth/update.schema";
import { validate } from "../middleware/validate";
import { CommentController } from "../controllers/CommentsController";

const adminRouteur = Router();

adminRouteur.get("/chronicles",authGuard, isAdmin, ChroniclesController.getAll);
adminRouteur.get("/chronicles/:id",authGuard, isAdmin, ChroniclesController.getById);
adminRouteur.delete("/chronicles/:id",authGuard, isAdmin, ChroniclesController.delete);
adminRouteur.put("/chronicles/:id", authGuard, isAdmin, ChroniclesController.update);
adminRouteur.patch("/chronicles/:id/toggle", authGuard, isAdmin, ChroniclesController.toggle);
adminRouteur.post("/chronicles", authGuard, isAdmin, ChroniclesController.create);

adminRouteur.get("/users", authGuard, isAdmin, UsersController.getAll);
adminRouteur.get("/users/:id", authGuard, isAdmin, UsersController.getById);
adminRouteur.delete("/users/:id", authGuard, isAdmin, UsersController.delete);
adminRouteur.put("/users/:id", authGuard, isAdmin, validate(updateUserSchema, "body"), UsersController.update);
adminRouteur.patch("/users/:id/toggle", authGuard, isAdmin, UsersController.toggle);
adminRouteur.post("/users", authGuard, isAdmin, UsersController.create);

adminRouteur.get("/comments", authGuard, isAdmin, CommentController.getAll);
adminRouteur.get("/comments/:id", authGuard, isAdmin, CommentController.getOne);
adminRouteur.delete("/comments/:id", authGuard, isAdmin, CommentController.delete);
adminRouteur.put("/comments/:id", authGuard, isAdmin, CommentController.update);
adminRouteur.patch("/comments/:id/toggle", authGuard, isAdmin, CommentController.toggle);

export default adminRouteur;