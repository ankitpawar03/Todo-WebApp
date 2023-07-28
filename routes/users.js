import express from "express";
import {
    getAllUsers,
    getMyProfile,
    loginUser,
    registerUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/me",isAuthenticated, getMyProfile)

// or we can write it as below

// router.get("/userid/:id", findById);

// router.put("/userid/:id", findAndUpdate);

// router.delete("/userid/:id", deleteUser);

export default router;
