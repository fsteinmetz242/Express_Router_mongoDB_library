import { Router } from "express";
import { getAllUsers, registerUser } from "#controllers";

const userRouter = Router();

// Alle User auflisten
userRouter.get("/", getAllUsers);

// User registrieren
userRouter.post("/", registerUser);

export default userRouter;
