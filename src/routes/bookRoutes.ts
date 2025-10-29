import { Router } from "express";
import { getAllBooks, addBook, lendOutBook } from "#controllers";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", addBook);
bookRouter.put("/:id", lendOutBook);

export default bookRouter;
