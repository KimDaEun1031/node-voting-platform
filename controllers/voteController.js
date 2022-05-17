  const Vote = require("../models/Vote");
const User = require("../models/User");

exports.getNewVoting = (req, res, next) => {
  try {
    res.render("newVoting", { isLogin : true });
  } catch (error) {
    next(error);
  }
};

exports.postNewVoting = async (req, res, next) => {
  try {
    const {
      vote_title,
      vote_content,
      vote_expiration_date,
    } = req.body;

    const voteOptions = [];
    const creator = req.session.user.user_email;
    const expirationDate = new Date(vote_expiration_date);

    for (const value of vote_content) {
      voteOptions.push({ vote_content: value, voter: [] });
    }

    const user = await User.findOne({ user_email: creator }).lean();
    await Vote.create({
      vote_user: user._id,
      vote_title: vote_title,
      vote_options: voteOptions,
      vote_expiration_date: expirationDate,
      vote_completed: false,
    });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getShowVoting = (req, res, next) => {
  try {
    res.render("showVoting", { isLogin : false });
  } catch (error) {
    next(error);
  }
};

exports.getMyVoting = (req, res, next) => {
  try {
    res.render("myVoting", { isLogin : true });
  } catch (error) {
    next(error);
  }
};
