const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g, "Please fill a valid email address"],
    },
    user_password: {
      type: String,
      required: true,
      match: [/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, "Please fill a valid password"],
    },
    user_votes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vote',
    }
  }
);

userSchema.pre("save", async function () {
  this.user_password = await bcrypt.hash(this.user_password, 5);
});

module.exports = mongoose.model("User", userSchema);
