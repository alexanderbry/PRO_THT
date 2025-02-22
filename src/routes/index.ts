import { Router } from "express";
import UserController from "../controllers/UserController";
import errorHandler from "./middlewares/errorHandler";
const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/register", UserController.create);
router.post("/login", UserController.login);

router.use(errorHandler);

export default router;
