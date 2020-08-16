const sendResponse = require("../utils/sendResponse");
const User = require("../models/user");
//const phoneUtil = require("../utils/phoneUtils");
const generateToken = require("../utils/auth").generateToken;

const signUp = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  let errorMessage = "Something went wrong ,Please try again";

  try {
    const isUserPresent = await User.findOne({ email }, { lean: true });
    if (isUserPresent) {
      throw new Error(
        "Email is already registered.Try login or sign up through different email."
      );
    }

    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });

    const response = await user.save();

    return sendResponse(res, 200, {firstName},'User has been successfully created.');
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
      throw new Error(
        "No user was found."
      );
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
          role,
        },
        "User has been successfully logged in."
      );
    } else {
      return sendResponse(res, 400, {}, "Please enter correct password.");
    }
  } catch (error) {
    return sendResponse(res, 400, {},  error ? error.message : errorMessage);
  }
};

module.exports = { signUp,signIn };
