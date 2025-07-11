import express from "express";
import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch(() => {
      console.log("mongodb is not connected");
    });
};

export default connectDB;
