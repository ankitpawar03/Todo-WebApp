import {app} from "./app.js"
import { connectDB } from "./data/db.js";

connectDB()

app.listen(process.env.PORT, () => {
    console.log("server is working");
  });
  