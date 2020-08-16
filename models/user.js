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
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    encryptPassword: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
      maxlength: 10,
      minlength: 10,
      sparse: true,
      index: true,
    },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1, 2],
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
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
