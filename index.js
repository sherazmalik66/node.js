import express, { Router } from "express";
import router from "./src/routes/authRouter.js";
import connectDB from "./src/connectDB.js";
import todoRouter from "./src/routes/todoRouter.js";
import authenticateUser from "./src/middleWare/authenticateUser.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", router);
app.use("/todo", authenticateUser, todoRouter)

app.get("/", (req, res) => {
  res.send("my name is sheraz ajaml");
});

app.listen(3000, (req, res) => {
  console.log("Server is online");
});
