import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {

    const {title, discription} = req.body;

    await Task.create({
        title,
        discription,
        user: req.user,
    })

    res.status(201).json({

        success: true,
        message: "Task Created Successfully"
    })
}