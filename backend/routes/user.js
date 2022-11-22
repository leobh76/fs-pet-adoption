import express from "express";
const router = express.Router();

import { signUp, signIn, isAdmin } from "../controllers/user.js";

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/isAdmin", isAdmin);

export default router;