import express from "express";
import {
    getAllUsers,
    getMyProfile,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/me",isAuthenticated, getMyProfile)

// or we can write it as below

// router.get("/userid/:id", findById);

// router.put("/userid/:id", findAndUpdate);

// router.delete("/userid/:id", deleteUser);

export default router;
