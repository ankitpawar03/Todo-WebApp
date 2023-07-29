import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// REGISTER USER

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    setCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

// LOGIN USER

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid UserID or Password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      setCookie(user, res, `Welcome back, ${user.name}`, 200);
    } else {
      return next(new ErrorHandler("Invalid UserID or Password", 400));
    }
  } catch (error) {
    next(error);
  }
};

// UPDATE USER PROFILE

// export const findAndUpdate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, { name: "abcd" });
//     res.json({
//       success: true,
//       message: "User Updated Successfully",
//     });
//   } catch (error) {
//     next();
//   }
// };

// DELETE USER

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next();
  }
};

// GET USER PROFILE

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile received successfully",
    user: req.user,
  });
};

// LOGOUT USER

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};
