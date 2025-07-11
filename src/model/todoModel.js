import express from "express";
import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
