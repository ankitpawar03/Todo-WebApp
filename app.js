import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/taskRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors"

export const app = express();

config({
    path:"./data/config.env"
})

//middelware for sending json data to body
app.use(express.json());

//
app.use(cookieParser())

//
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  method: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))

//using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

//error middleware for handling error
app.use(errorMiddleware)