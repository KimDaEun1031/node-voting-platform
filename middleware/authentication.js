const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signUpAuthentication = async (req, res, next) => {
  try {
    const {
      user_email,
      user_password,
      checkPassword,
    } = req.body;

    const emailValidate = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
    const passwordValidate = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g;
    const isValidate = emailValidate.test(user_email) && passwordValidate.test(user_password);
    const isSamePassword = user_password === checkPassword;

    if (!(isValidate && isSamePassword)) {
      return res.redirect("/signup");
    }

    const user = await User.findOne({ user_email });

    if (!user) {
      next();
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

exports.loginAuthentication = async (req, res, next) => {
  try {
    const {
      user_email,
      user_password,
    } = req.body;

    const user = await User.findOne({ user_email });

    const isSameEmail = user.user_email === user_email;
    const isSamePassword = bcrypt.compare(user_password, user.user_password);

    if (isSameEmail && isSamePassword) {
      next();
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

exports.authentication = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.redirect("/login");
  }
};
