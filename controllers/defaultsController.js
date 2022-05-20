const Vote = require("../models/Vote");
const User = require("../models/User");

const { checkExpirationTime } = require("../public/javascripts/utill");

exports.getAllVoteList = async (req, res, next) => {
  try {
    let isLogin = false;
    let userId = "";

    if (req.session.user) {
      isLogin = true;
      userId = req.session.user.userEmail;
    }

    const votes = await Vote.find().lean();
    let voteList = [];

    if (!votes) {
      return res.render("index", {
        isLogin,
        votes,
      });
    }

    for (const data of votes) {
      const user = await User.findOne({ _id: data.voteCreator }).lean();
      const result = checkExpirationTime(data.voteExpirationDate);

      if (!result) {
        await Vote.findOneAndUpdate(
          { _id: data._id },
          { voteCompleted: true },
        ).lean();
      }

      const vote = Object.assign(data, { userEmail: user.userEmail });
      voteList.push(vote);
    }

    res.render("index", {
      isLogin,
      votes: voteList,
      userId,
    });
  } catch (error) {
    next(error);
  }
};
