const User = require("../models/User");

exports.getSignUp = (req, res, next) => {
  try {
    res.render("signup", { isLogin : false });
  } catch (error) {
    next(error);
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    const {
      user_email,
      user_password,
    } = req.body;

    await User.create({
      user_email: user_email,
      user_password: user_password,
    });

    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

exports.getLogin = (req, res, next) => {
  try {
    res.render("login", { isLogin : false });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    req.session.user = { user_email: req.body.user_email };
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getLogout = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
};
