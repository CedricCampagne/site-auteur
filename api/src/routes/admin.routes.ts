import { Router } from "express";
import { ChroniclesController } from "../controllers/ChroniclesController";
import { authGuard } from "../middleware/authGuard";
import { isAdmin } from "../middleware/isAdmin";

const adminRouteur = Router();

adminRouteur.get("/chronicles",authGuard, isAdmin, ChroniclesController.getAll);

export default adminRouteur;