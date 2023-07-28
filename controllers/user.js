import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const allUser = await User.find();
  console.log(req.query);

  // res.send(allUser);
  res.json({
    success: true,
    allUser,
  });
};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("tempi", "abc").json({
    success: true,
    message: "Registered Successgully",
  });
};

export const special = (req, res) => {
  res.json({
    success: true,
    message: "'just kidding",
  });
};

export const findById = async (req, res) => {
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
  const user = await User.findByIdAndUpdate(id, {name:"abcd"});
  // console.log(req.params)

  res.json({
    success: true,
    message: "User Updated Successfully"
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  // console.log(req.params)

  res.json({
    success: true,
    message: "User Deleted Successfully"
  });
};