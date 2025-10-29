import express from "express";
import "#db";
import { userRouter, bookRouter } from "#routes";

//import { prodRoutes } from "#routes";

const app = express();
const port = 3000;

// middlewares, cors, body-parser
app.use(express.json());

app.use("/user", userRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the *APP*" });
// });

console.log("bookRouter");
app.use("/book", bookRouter);

app.listen(port, () => {
  console.log(`\x1b[35mMain app listening at http://localhost:${port}\x1b`);
});
