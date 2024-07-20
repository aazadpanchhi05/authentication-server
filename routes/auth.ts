import express from "express";

import { resetPassword, signIn, signUp } from "../controllers";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.patch("/reset-password", resetPassword);

export { router };
