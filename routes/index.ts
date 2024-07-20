import express from "express";

import { router as authRoutes } from "./auth";

const router = express.Router();

router.use("/auth", authRoutes);

export { router };
