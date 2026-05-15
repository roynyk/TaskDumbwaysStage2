import { Router } from "express";
import {
  helloUser,
  getUserById,
  loginUser,
  createUser,
  getAllUsers
} from "../controllers/userController";

const router = Router();
router.get("/hello", helloUser);
router.get("/:name", getUserById);
router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/", getAllUsers)

export default router;
