import { Router } from "express";

// Middlewares
import { authGuard } from "../middleware/authGuard";
import { isAdmin } from "../middleware/isAdmin";
import { validate } from "../middleware/validate";

// Validators
import { idSchema } from "../validators/id.schema";
// Validators Chronicles
import { updateChronicleSchema } from "../validators/chronicles/updateChronicle.schema";
import { createChronicleSchema } from "../validators/chronicles/createChronicle.schema";
// Validators Users
import { updateUserSchema } from "../validators/auth/updateUser.schema";
import { createUserSchema } from "../validators/auth/createUser.schema";
// Validators Comments
import { updateCommentSchema } from "../validators/comments/updateComment.schema"

// Controllers
import { ChroniclesController } from "../controllers/ChroniclesController";
import { UsersController } from "../controllers/UsersController";
import { CommentController } from "../controllers/CommentsController";

const adminRouteur = Router();

// Chronicles Routes
adminRouteur.get("/chronicles",authGuard, isAdmin, ChroniclesController.getAll);
adminRouteur.get("/chronicles/:id",authGuard, isAdmin, validate(idSchema, "params"), ChroniclesController.getById);
adminRouteur.delete("/chronicles/:id",authGuard, isAdmin, validate(idSchema, "params"), ChroniclesController.delete);
adminRouteur.put("/chronicles/:id", authGuard, isAdmin, validate(idSchema, "params"), validate(updateChronicleSchema, "body"), ChroniclesController.update);
adminRouteur.patch("/chronicles/:id/toggle", authGuard, isAdmin, validate(idSchema, "params"), ChroniclesController.toggle);
adminRouteur.post("/chronicles", authGuard, isAdmin, validate(createChronicleSchema, "body"), ChroniclesController.create);

// Users Routes
adminRouteur.get("/users", authGuard, isAdmin, UsersController.getAll);
adminRouteur.get("/users/:id", authGuard, isAdmin, validate(idSchema, "params"), UsersController.getById);
adminRouteur.delete("/users/:id", authGuard, isAdmin, validate(idSchema, "params"), UsersController.delete);
adminRouteur.put("/users/:id", authGuard, isAdmin, validate(idSchema, "params"), validate(updateUserSchema, "body"), UsersController.update);
adminRouteur.patch("/users/:id/toggle", authGuard, isAdmin, validate(idSchema, "params"), UsersController.toggle);
adminRouteur.post("/users", authGuard, isAdmin,validate(createUserSchema, "body"),UsersController.create);

// Comments Routes
adminRouteur.get("/comments", authGuard, isAdmin, CommentController.getAll);
adminRouteur.get("/comments/:id", authGuard, isAdmin, validate(idSchema, "params"), CommentController.getOne);
adminRouteur.delete("/comments/:id", authGuard, isAdmin, validate(idSchema, "params"), CommentController.delete);
adminRouteur.put("/comments/:id", authGuard, isAdmin, validate(idSchema, "params"),validate(updateCommentSchema, "body"), CommentController.update);
adminRouteur.patch("/comments/:id/toggle", authGuard, isAdmin, validate(idSchema, "params"), CommentController.toggle);

export default adminRouteur;