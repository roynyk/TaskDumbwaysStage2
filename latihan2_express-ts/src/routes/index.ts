import { Router } from "express";
import userRoute from "./userRoute";
import productRoute from "./productRoute";

const router = Router();

router.use("/users", userRoute);
router.use("/products", productRoute);

export default router;
