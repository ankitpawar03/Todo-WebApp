import express from "express";
import userRouter from "./routes/users.js";
import { config } from "dotenv";

export const app = express();

config({
    path:"./data/config.env"
})

//middelware for sending json data to body
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

//userid/fsjfs
//userid/abhi both are same for params

