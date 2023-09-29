import { Router } from "express";
import { createBook, deleteBook, getBooks, getOneBook, updateBook } from "../logic";
import { isBookIdValid } from "../middleware/isBookIdValid";
import { isBookNameUnique } from "../middleware/isBookNameUnique";

export const booksRoutes = Router();

booksRoutes.get("/", getBooks);
booksRoutes.get("/:id", isBookIdValid, getOneBook);
booksRoutes.post("/", isBookNameUnique, createBook);
booksRoutes.delete("/:id", isBookIdValid, deleteBook);
booksRoutes.put("/:id", isBookIdValid, updateBook);