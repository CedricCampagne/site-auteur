import { Router } from "express";
import { ChroniclesController } from "../controllers/ChroniclesController";
import { slugSchema } from "../validators/chronicles/slug.schema";
import { validate } from "../middleware/validate";

const chroniclesRouter = Router();

chroniclesRouter.get("/", ChroniclesController.getAll);
chroniclesRouter.get("/latest3", ChroniclesController.getLatest3);
chroniclesRouter.get('/random3', ChroniclesController.getRandom);
chroniclesRouter.get('/:slug', validate(slugSchema, "params"), ChroniclesController.getSlug);

export default chroniclesRouter;