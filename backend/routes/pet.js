import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createPet,
  deletePet,
  getPet,
  getPets,
  getPetsBySearch,
  getPetsByUser,
  updatePet,
  likePet,
} from "../controllers/pet.js";

router.get("/search", getPetsBySearch);
router.get("/", getPets);
router.get("/:id", getPet);

router.post("/", auth, createPet);
router.delete("/:id", auth, deletePet);
router.patch("/:id", auth, updatePet);
router.get("/userpets/:id", auth, getPetsByUser);
router.patch("/like/:id", auth, likePet);

export default router;