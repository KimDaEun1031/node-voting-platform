const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.validateSignUpForm = async (req, res, next) => {
  try {
    const {
      userEmail,
      userPassword,
      userPasswordCheck,
    } = req.body;

    const emailValidation = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
    const passwordValidation = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g;
    const isValidationEmailPassword = emailValidation.test(userEmail) && passwordValidation.test(userPassword);
    const isSamePassword = userPassword === userPasswordCheck;

    if (emailValidation.test(userEmail)) {
      req.flash("message", "정확한 이메일 주소를 입력해주세요.");
    } else if (passwordValidation.test(userPassword)) {
      req.flash("message", "비밀번호는 8~15자이며 최소 대소문자, 특수문자가 1개 씩 들어가야합니다.");
    } else if (!isSamePassword) {
      req.flash("message", "비밀번호가 맞지 않습니다.");
    }

    if (!(isValidationEmailPassword && isSamePassword)) {
      return res.redirect("/signup");
    }

    const user = await User.findOne({ userEmail: userEmail });

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
      userEmail,
      userPassword,
    } = req.body;

    const user = await User.findOne({ userEmail: userEmail });

    if (!user) {
      req.flash("message", "존재하지 않는 사용자이거나 이메일과 비밀번호 형식을 확인해주세요.");
      return res.redirect("/login");
    }

    const isSamePassword = await bcrypt.compare(userPassword, user.userPassword);

    if (isSamePassword) {
      return next();
    }

    req.flash("message", "비밀번호 형식을 확인해주세요.");
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
