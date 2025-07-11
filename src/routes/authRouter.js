// import dotenv from "dotenv";
// dotenv.config();
// import express, { Router } from "express";
// import User from "../model/userModel.js";
// import jwt from "jsonwebtoken";
// import md5 from "md5";

// const router = express.Router();

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const passwordHash = md5(password);

//   const foundUser = await User.findOne({ email });

//   if (!foundUser) {
//     return res.status(404);
//   }

//   if (foundUser.passwordHash !== passwordHash) {
//     return res.status(403).json({
//       message: "Invalid Credentials",
//     });
//   }

//   const token = jwt.sign(foundUser, process.env.SECRET);

//   console.log(foundUser)

//   res.status(201).json({
//     user: foundUser,
//     token: token,
//   });

//   res.status(200).json(foundUser);
// });

// router.post("/sign-up", async (req, res) => {
//   const { email, password } = req.body;

//   const foundUser = await User.find({ email });

//   if (foundUser.length > 0) {
//     return res.status(409).json({
//       message: "Email already in use",
//     });
//   }

//   const newUser = User({
//     email,
//     passwordHash: md5(password),
//   });

//   await newUser.save();
// });

// export default router;

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken"; // ✅ safer for ESM
import md5 from "md5";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = md5(password);

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (foundUser.passwordHash !== passwordHash) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(foundUser.toObject(), process.env.SECRET);

  res.status(201).json({
    user: foundUser,
    token: token,
  });
});

router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.find({ email });

  if (foundUser.length > 0) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const newUser = new User({
    email,
    passwordHash: md5(password),
  });

  await newUser.save();

  const token = jwt.sign(newUser.toObject(), process.env.SECRET);

  res.status(201).json({
    user: newUser,
    token: token,
  });
});

export default router;
