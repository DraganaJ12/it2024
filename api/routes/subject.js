import express from "express";
import { addSubject, getSubjects, getSubject } from "../controllers/subject.js";

const router = express.Router();

router.post("/", addSubject)
router.get("/", getSubjects)
router.get("/:id", getSubject)


export default router