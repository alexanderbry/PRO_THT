import { Router } from "express";
import UserController from "../controllers/UserController";
import errorHandler from "./middlewares/errorHandler";
import authentication from "./middlewares/authentication";
import authorization from "./middlewares/authorization";
const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/register", UserController.create);
router.post("/login", UserController.login);

router.post("/admin/login", UserController.adminLogin);

router.use(authentication);
router.use(authorization);

router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.use(errorHandler);

export default router;
