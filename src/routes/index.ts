import { Router } from "express";
import UserController from "../controllers/UserController";
import errorHandler from "./middlewares/errorHandler";
const router = Router();

router.post("/register", UserController.create);

router.use(errorHandler);

export default router;
