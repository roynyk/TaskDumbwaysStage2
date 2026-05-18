import { Router } from "express";
import {
  helloUser,
  getUserById,
  loginUser,
  createUser,
  getAllUsers,
  transferPoint,
} from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { transferPointSchema } from "../validations/userSchema";

const router = Router();
router.get("/hello", helloUser);
router.get("/:name", getUserById);
router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/", getAllUsers);
router.post("/transfer", validate(transferPointSchema), transferPoint);

export default router;
