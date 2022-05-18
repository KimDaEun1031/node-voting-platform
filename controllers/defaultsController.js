const Vote = require("../models/Vote");
const User = require("../models/User");

exports.getAllVoteList = async (req, res, next) => {
  try {
    let flag = false;

    if (req.session.user) {
      flag = true;
    }

    const votes = await Vote.find().lean();
    const voteList = [];

    if (!votes) {
      res.render("index", { isLogin : flag, voteList });
    }

    for (const data of votes) {
      const user = await User.findOne({ _id: data.vote_user });
      const userId = user.user_email.split("@")[0];
      const formatDate = data.vote_expiration_date.toISOString().split("T")[0];

      voteList.push({
        _id: data._id,
        vote_title: data.vote_title,
        vote_completed: data.vote_completed,
        vote_user: userId,
        vote_expiration_date: formatDate,
      });
    }

    voteList.reverse();

    res.render("index", { isLogin : flag, voteList });
  } catch (error) {
    next(error);
  }
};
