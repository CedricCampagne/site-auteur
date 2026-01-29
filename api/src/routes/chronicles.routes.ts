import { Router } from "express";
import { ChroniclesController } from "../controllers/ChroniclesController";
import { chronicleIdSchema } from "../validators/chronicles/id.schema";
import { validate } from "../middleware/validate";

const chroniclesRouter = Router();

chroniclesRouter.get("/", ChroniclesController.getAll);
chroniclesRouter.get("/latest3", ChroniclesController.getLatest3);
chroniclesRouter.get('/random3', ChroniclesController.getRandom);
chroniclesRouter.get('/:id/:slug', validate(chronicleIdSchema, "params"), ChroniclesController.getById);

export default chroniclesRouter;