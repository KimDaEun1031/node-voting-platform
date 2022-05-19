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
      userEmail,
      userPassword,
    } = req.body;

    await User.create({
      userEmail: userEmail,
      userPassword: userPassword,
      userVoteList: [],
    });

    req.flash("message", "회원가입에 성공했습니다.");
    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

exports.getLogin = (req, res, next) => {
  try {
    req.session.url = {
      urlCheck: req.headers.referer.substring(30),
      originUrl: req.headers.referer
    };

    res.render("login", { isLogin : false });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    req.session.user = { userEmail: req.body.userEmail };
    req.flash("message", "로그인에 성공했습니다!");

    const { urlCheck, originUrl } = req.session.url;

    if (urlCheck.length === 24) {
      return res.redirect(originUrl);
    }

    res.redirect("/");
  } catch (error) {
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
