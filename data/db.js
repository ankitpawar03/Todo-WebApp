import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
  .connect(process.env.MONGODB, {
    dbName: "apiBackend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
}