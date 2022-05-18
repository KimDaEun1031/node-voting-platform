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

exports.getShowVoting = async (req, res, next) => {
  try {
    let flag = false;

    if (req.session.user) {
      flag = true;
    }

    const vote = await Vote.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: vote.vote_user });
    const userId = user.user_email.split("@")[0];

    if (!vote) {
      next(error);
    }

    res.render("showVoting", { isLogin : flag, vote, userId });
  } catch (error) {
    next(error);
  }
};

exports.postShowVoting = async (req, res, next) => {
  try {
    const { vote_checked } = req.body;
    const { user_email } = req.session.user;

    const vote = await Vote.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: vote.vote_user });
    const userId = user.user_email.split("@")[0];

    for (const option of vote.vote_options) {
      if (option.vote_content === vote_checked) {
        option.voter.push(user_email);
        vote.save();
      }
    }

    res.render("showVoting", { isLogin : true, vote, userId });
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
