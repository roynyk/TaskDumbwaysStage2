import { Router } from "express";
import userRoute from "./userRoute";
import productRoute from "./productRoute";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";
import { logMiddleware } from "../middlewares/logMiddleware";

const router = Router();

router.use("/users", apiKeyMiddleware, userRoute);
router.use("/products", logMiddleware, productRoute);

export default router;
