import { Router } from "express";
import {
  helloUser,
  getUserById,
  loginUser,
} from "../controllers/userController";

const router = Router();
router.get("/hello", helloUser);
router.get("/:name", getUserById);
router.post("/login", loginUser);

export default router;
