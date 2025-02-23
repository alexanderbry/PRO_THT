import { Router } from "express";
import UserController from "../controllers/UserController";
import errorHandler from "./middlewares/errorHandler";
import authentication from "./middlewares/authentication";
import authorization from "./middlewares/authorization";
const router = Router();

// Public Routes
router.get("/", UserController.getAllUsers);
router.post("/register", UserController.create);
router.post("/login", UserController.login);

// Admin Routes
router.post("/admin/login", UserController.adminLogin);

// Protected Routes
router.get("/:id", authentication, UserController.getUserById);
router.put("/:id", authentication, authorization, UserController.updateUser);
router.delete("/:id", authentication, authorization, UserController.deleteUser);

router.use(errorHandler);

export default router;
