exports.getAllVoteList = async (req, res, next) => {
  try {
    let flag = false;

    if (req.session.user) {
      flag = true;
    }

    res.render("index", { isLogin : flag });
  } catch (error) {
    next(error);
  }
};
