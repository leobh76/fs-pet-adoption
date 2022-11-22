import express from "express";
const router = express.Router();

import {
  createUser,
  getUsers,
  getUser,
  getUsersByAdmin,
  deleteUser,
  updateUser,
} from "../controllers/admin.js";

router.get("/", getUsers)
router.get("/:id", getUser)

router.post("/", createUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
router.get("/adminusers/:id", getUsersByAdmin)

export default router;