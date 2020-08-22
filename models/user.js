const mongoose = require("mongoose");
const {
  encryptPassword,
  comparePassword,
} = require("../utils/hashPassword");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 30,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
      required: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    encryptPassword: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1, 2],
    },
    otp:{
      type: String,
      required: true,
      maxlength: 4,
      minlength: 4,
    },
    otpCreatedOn:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("password").set(function (password) {
  this.encryptPassword = encryptPassword(password);
});

userSchema.methods = {
  authenticatePassword: function (plainTextPassword) {
    return comparePassword(plainTextPassword, this.encryptPassword);
  },
};

module.exports = mongoose.model("User", userSchema);
