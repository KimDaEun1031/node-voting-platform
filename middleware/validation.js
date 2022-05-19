const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.validateSignUpForm = async (req, res, next) => {
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

    if (emailValidate.test(user_email)) {
      req.flash("message", "정확한 이메일 주소를 입력해주세요.");
    } else if (passwordValidate.test(user_password)) {
      req.flash("message", "비밀번호는 8~15자이며 최소 대소문자, 특수문자가 1개 씩 들어가야합니다.");
    } else if (isSamePassword) {
      req.flash("message", "비밀번호가 맞지 않습니다.");
    }

    if (!(isValidate && isSamePassword)) {
      return res.redirect("/signup");
    }

    const user = await User.findOne({ user_email });

    if (user) {
      req.flash("message", "이미 존재하는 사용자입니다.");
      return res.redirect("/login");
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.validateLoginForm = async (req, res, next) => {
  try {
    const {
      user_email,
      user_password,
    } = req.body;

    const user = await User.findOne({ user_email: user_email });

    if (!user) {
      req.flash("message", "존재하지 않는 사용자이거나 이메일이 맞지 않습니다.");
      return res.redirect("/login");
    }

    const isSamePassword = await bcrypt.compare(user_password, user.user_password);

    if (isSamePassword) {
      return next();
    }

    req.flash("message", "비밀번호를 틀리셨습니다.");
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
