import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// creating server
// instead of const server = express();
// we prefer const app = express();
const app = express();

// using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
// using middlewares
app.use(express.urlencoded({ extended: true }));
// using middlewares
app.use(cookieParser());

const PORT = 5000;

//setting up view engine
app.set("view engine", "ejs");

//authentication
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (token) {
    const decoded = jwt.verify(token, "hksjhfjsfhupoiwoe");
    console.log(decoded);

    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("logout");
});

app.post("/login", async (req, res) => {
  const { name, email } = req.body;

  const user = await User.create({
    name,
    email,
  });

  const token = jwt.sign({ _id: user._id }, "hksjhfjsfhupoiwoe");

  console.log(token);
  //   console.log(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 6 * 1000),
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

//listening on server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.get("/", (req, res) => {
//     // res.render("login")
//     const {token} = req.cookies
//     console.log(req.cookies)
//     if(token){
//         res.render("logout")
//     }else{
//         res.render("login")
//         // res.redirect("/")
//     }
// })

// app.post("/", async (req, res) => {
//     res.cookie("token", "iamin",{
//     httpOnly: true,
//     expires: new Date(Date.now()+5*1000)})
//     res.redirect("/")
// })
