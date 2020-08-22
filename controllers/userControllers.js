const express = require("express");
const userRouter = express.Router();
const { signUp,signIn,verifyEmail } = require("../services/userService");

//signup
userRouter.post("/signup", signUp);
//signin
userRouter.post("/signin", signIn);
//verify email
userRouter.post("/verifyEmail", verifyEmail);

module.exports = userRouter;
