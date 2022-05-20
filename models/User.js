const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g, "Please fill a valid email address"],
    },
    userPassword: {
      type: String,
      required: true,
      match: [/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, "Please fill a valid password"],
    },
    userVoteList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
    }]
  }
);

userSchema.pre("save", async function () {
  this.userPassword = await bcrypt.hash(this.userPassword, 5);
});

module.exports = mongoose.model("User", userSchema);
