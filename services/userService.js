const sendResponse = require("../utils/sendResponse");
const User = require("../models/user");
const { sendMail } = require("../utils/mail");
const generateOtp = require("../utils/generateOtp");
//const phoneUtil = require("../utils/phoneUtils");
const generateToken = require("../utils/auth").generateToken;
const { ONE_MINUTE, currentUTC } = require("../utils/timeStamps");

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let errorMessage = "Something went wrong ,Please try again";

  try {
    const isUserPresent = await User.findOne({ email }, { lean: true });
    if (isUserPresent) {
      throw new Error(
        "Email is already registered.Try login or sign up through different email."
      );
    }

    const otp = generateOtp(4);
    const otpCreatedOn = currentUTC();
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      otp,
      otpCreatedOn,
    });

    await user.save();
    sendMail(
      email,
      "Welcome to Chatter-Me application",
      `Your verifcation otp is ${otp}`
    );

    return sendResponse(
      res,
      200,
      { firstName },
      "User has been successfully created,Please verify your otp."
    );
  } catch (error) {
    return sendResponse(res, 400, {}, error ? error.message : errorMessage);
  }
};

const verifyEmail = async (req, res) => {
  let errorMessage = "Something went wrong ,Please try again";
  try {
    const { email, otp } = req.body;

    const isUserPresent = await User.findOne({ email });

    if (!isUserPresent) {
      throw new Error("No Email was found,please register your acoount");
    }

    const msDiff =
      new Date(currentUTC()).getTime() -
      new Date(isUserPresent.otpCreatedOn).getTime();
    if (!msDiff > 0 && !msDiff < 5 * ONE_MINUTE)
      throw new Error("OTP expired please enter within 5 minute");

    if (isUserPresent.otp !== otp) {
      throw new Error("OTP was incorrect.");
    }

    await isUserPresent.updateOne({ isEmailVerified: true });

    return sendResponse(res, 201, {}, "Successfully verified");
  } catch (error) {
    return sendResponse(res, 400, {}, error ? error.message : errorMessage);
  }
};

const signIn = async (req, res) => {
  let errorMessage = "Something went wrong ,Please try again";
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      throw new Error("No user was found.");
    }

    if (!userData.isEmailVerified) {
      throw new Error("Please verify your email.");
    }

    if (userData.authenticatePassword(password)) {
      const token = generateToken({
        id: userData.id,
        role: userData.role,
      });

      return sendResponse(
        res,
        200,
        {
          token,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
        },
        "User has been successfully logged in."
      );
    } else {
      return sendResponse(res, 400, {}, "Please enter correct password.");
    }
  } catch (error) {
    return sendResponse(res, 400, {}, error ? error.message : errorMessage);
  }
};

module.exports = { signUp, signIn, verifyEmail };
