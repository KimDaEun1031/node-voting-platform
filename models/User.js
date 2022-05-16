const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      required: "Email address is required",
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    user_password: {
      type: String,
      required: true,
      match: [/(?=.*\d)(?=.*[a-z]).{8,}/, "Please fill a valid password"],
    },
  }
);

module.exports = mongoose.model("User", userSchema);
