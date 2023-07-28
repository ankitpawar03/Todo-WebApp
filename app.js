import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/taskRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

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
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

//userid/fsjfs
//userid/abhi both are same for params

