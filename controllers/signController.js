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
      user_votes: [],
    });

    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

exports.getLogin = (req, res, next) => {
  try {
    req.session.url = {
      check: req.headers.referer.substring(30),
      originUrl: req.headers.referer
    };

    res.render("login", { isLogin : false });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    req.session.user = { user_email: req.body.user_email };
    req.flash("message", "로그인에 성공했습니다!");

    const { check, originUrl } = req.session.url;

    if (check.length === 24) {
      return res.redirect(originUrl);
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getLogout = (req, res, next) => {
  try {
    if (req.session.user) {
      req.session.destroy((error) => {
        if (error) {
          throw error;
        }

        res.redirect("/");
      });
    }
  } catch (error) {
    next(error);
  }
};
