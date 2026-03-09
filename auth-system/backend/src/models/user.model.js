const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLenght: 8,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    refreshToken: String,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (userEnteredPassword) {
  return bcrypt.compare(userEnteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
