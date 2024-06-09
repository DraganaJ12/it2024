import express from "express";
import { addBook, getBooks, getBook } from "../controllers/book.js";

const router = express.Router();

router.post("/", addBook)
router.get("/", getBooks)
router.get("/:id", getBook)


export default router