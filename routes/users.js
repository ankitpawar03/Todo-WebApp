import express from "express";
import {
    deleteUser,
    findAndUpdate,
    findById,
    getAllUsers,
    registerUser,
    special,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.get("/userid/special", special);

router
.route("/userid/:id")
.get(findById)
.put(findAndUpdate)
.delete(deleteUser)

// or we can write it as below

// router.get("/userid/:id", findById);

// router.put("/userid/:id", findAndUpdate);

// router.delete("/userid/:id", deleteUser);

export default router;
