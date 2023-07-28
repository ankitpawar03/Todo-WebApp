import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  setCookie(user, res, "Registered Successfully", 201);
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    setCookie(user, res, `Welcome back, ${user.name}`, 200);
  } else {
    res.status(404).json({
      success: false,
      message: "UserId or Password not matched",
    });
  }
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // console.log(req.params)

  res.json({
    success: true,
    user,
  });
};

export const findAndUpdate = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { name: "abcd" });
  // console.log(req.params)

  res.json({
    success: true,
    message: "User Updated Successfully",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  // console.log(req.params)

  res.json({
    success: true,
    message: "User Deleted Successfully",
  });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile received successfully",
    user: req.user,
  });
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};
