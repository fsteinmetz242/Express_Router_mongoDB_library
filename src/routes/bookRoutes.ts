import { Router } from "express";
import { getAllBooks, addBook, lendOutBook, returnBook } from "#controllers";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", addBook);
bookRouter.put("/out/:id", lendOutBook); //Ausleihen
bookRouter.put("/in/:id", returnBook); //Rückgabe

export default bookRouter;
