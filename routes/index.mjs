import express from "express";
import userRoute from "./userRoute.mjs";
import userProfileRoutes from "./userProfileRoutes.mjs";
import authRoute from "./authRoute.mjs";

const router = express.Router();

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/user_profiles", userProfileRoutes);

export default router;
