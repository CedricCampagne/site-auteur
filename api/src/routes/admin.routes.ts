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

//Dto
import { GetChronicleByIdParams } from "../dto/chronicles/GetChronicleByIdParams.dto";
import { CreateChronicleDto } from "../dto/chronicles/CreateChronicle.dto";
import { GetCommentByIdParams } from "../dto/comment/GetCommentByIdParams.dto";
import { GetUserByIdParams } from "../dto/user/GetUserByIdParams.dto";
import { UpdateUserDto } from "../dto/user/UpdateUser.dto";
import { CreateUserDto } from "../dto/user/CreateUser.dto";

const adminRouteur = Router();

// Chronicles Routes
adminRouteur.get("/chronicles",authGuard, isAdmin, ChroniclesController.getAll);
adminRouteur.get<GetChronicleByIdParams>("/chronicles/:id",authGuard, isAdmin, validate(idSchema, "params"), ChroniclesController.getById);
adminRouteur.delete<GetChronicleByIdParams>("/chronicles/:id",authGuard, isAdmin, validate(idSchema, "params"), ChroniclesController.delete);
adminRouteur.put<GetChronicleByIdParams>("/chronicles/:id", authGuard, isAdmin, validate(idSchema, "params"), validate(updateChronicleSchema, "body"), ChroniclesController.update);
adminRouteur.patch<GetChronicleByIdParams>("/chronicles/:id/toggle", authGuard, isAdmin, validate(idSchema, "params"), ChroniclesController.toggle);
adminRouteur.post<{}, {}, CreateChronicleDto>("/chronicles", authGuard, isAdmin, validate(createChronicleSchema, "body"), ChroniclesController.create);

// Users Routes
adminRouteur.get("/users", authGuard, isAdmin, UsersController.getAll);
adminRouteur.get<GetUserByIdParams>("/users/:id", authGuard, isAdmin, validate(idSchema, "params"), UsersController.getById);
adminRouteur.delete<GetUserByIdParams>("/users/:id", authGuard, isAdmin, validate(idSchema, "params"), UsersController.delete);
adminRouteur.put<GetUserByIdParams, {}, UpdateUserDto>("/users/:id", authGuard, isAdmin, validate(idSchema, "params"), validate(updateUserSchema, "body"), UsersController.update);
adminRouteur.patch<GetUserByIdParams>("/users/:id/toggle", authGuard, isAdmin, validate(idSchema, "params"), UsersController.toggle);
adminRouteur.post<{}, {}, CreateUserDto>("/users", authGuard, isAdmin,validate(createUserSchema, "body"),UsersController.create);

// Comments Routes
adminRouteur.get("/comments", authGuard, isAdmin, CommentController.getAll);
adminRouteur.get<GetCommentByIdParams>("/comments/:id", authGuard, isAdmin, validate(idSchema, "params"), CommentController.getOne);
adminRouteur.delete<GetCommentByIdParams>("/comments/:id", authGuard, isAdmin, validate(idSchema, "params"), CommentController.delete);
adminRouteur.put<GetCommentByIdParams>("/comments/:id", authGuard, isAdmin, validate(idSchema, "params"),validate(updateCommentSchema, "body"), CommentController.update);
adminRouteur.patch<GetCommentByIdParams>("/comments/:id/toggle", authGuard, isAdmin, validate(idSchema, "params"), CommentController.toggle);

export default adminRouteur;