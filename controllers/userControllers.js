const express = require("express");
const userRouter = express.Router();
const { signUp,signIn } = require("../services/userService");

//signup
userRouter.post("/signup", signUp);
//signin
userRouter.post("/signin", signIn);

module.exports = userRouter;
