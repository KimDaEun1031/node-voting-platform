exports.getNewVoting = (req, res, next) => {
  try {
    res.render("newVoting");
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
    res.render("showVoting");
  } catch (error) {
    next(error)
  }
};

exports.getMyVoting = (req, res, next) => {
  try {
    res.render("myVoting");
  } catch (error) {
    next(error)
  }
};
