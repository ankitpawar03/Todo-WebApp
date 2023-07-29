import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Task } from "../models/task.js";

// CREATING NEW TASK
export const newTask = async (req, res, next) => {
  try {
    const { title, discription } = req.body;
    await Task.create({
      title,
      discription,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GETTING ALL TASK
export const getAllTask = async (req, res) => {
  try {
    const userid = req.user._id;
    const allTask = await Task.find({ user: userid });
    res.status(200).json({
      success: "true",
      allTask,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATING TASK
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETING TASK
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
