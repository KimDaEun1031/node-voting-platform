exports.getNewVoting = (req, res, next) => {
  try {
    res.render("newVoting", { isLogin : true });
  } catch (error) {
    next(error)
  }
};

exports.postNewVoting = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
};

exports.getShowVoting = (req, res, next) => {
  try {
    res.render("showVoting", { isLogin : false });
  } catch (error) {
    next(error)
  }
};

exports.getMyVoting = (req, res, next) => {
  try {
    res.render("myVoting", { isLogin : true });
  } catch (error) {
    next(error)
  }
};
