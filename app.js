import express from "express";
import userRouter from "./routes/users.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
// import bcrypt from "bcryptjs";

export const app = express();

// export const bcrypt = bcrypt()

config({
    path:"./data/config.env"
})

//middelware for sending json data to body
app.use(express.json());

//
app.use(cookieParser())

//using routes
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

//userid/fsjfs
//userid/abhi both are same for params

