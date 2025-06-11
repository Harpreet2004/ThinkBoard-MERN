import express from "express";
import { deleteNotes, getNotes, createNotes, updateNotes, getNoteById } from "../controllers/notes.controllers.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNotes)
router.put("/:id", updateNotes)
router.delete("/:id", deleteNotes)

export default router;