exports.getSignUp = (req, res, next) => {
  try {
    res.render("signup");
  } catch (error) {
    next(error)
  }
};

exports.postSignUp = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
};

exports.getLogin = (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error)
  }
};

exports.postLogin = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
};

exports.getLogout = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
};
