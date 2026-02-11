import { Router } from "express";
import { ChroniclesController } from "../controllers/ChroniclesController";
import { authGuard } from "../middleware/authGuard";
import { isAdmin } from "../middleware/isAdmin";

const adminRouteur = Router();

adminRouteur.get("/chronicles",authGuard, isAdmin, ChroniclesController.getAll);
adminRouteur.get("/chronicles/:id",authGuard, isAdmin, ChroniclesController.getById);
adminRouteur.delete("/chronicles/:id",authGuard, isAdmin, ChroniclesController.delete);
adminRouteur.put("/chronicles/:id", authGuard, isAdmin, ChroniclesController.update);
adminRouteur.patch("/chronicles/:id/toggle", authGuard, isAdmin, ChroniclesController.toggle);
adminRouteur.post("/chronicles", authGuard, isAdmin, ChroniclesController.create);

export default adminRouteur