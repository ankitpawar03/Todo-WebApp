import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    title:{
        type: String,
        require: true,
    },
    discription: {
      type: String,
      require: true
    },
    isComleted:{
      type: Boolean,
      default: false,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    createdAt:{
      type: Date,
      default: Date.now,
      require: true,
    },
  });

export const Task = mongoose.model("Task", schema);