const Vote = require("../models/Vote");
const User = require("../models/User");

const { checkTime, validationDate } = require("../public/javascripts/validationDate");

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

    const result = validationDate(vote_expiration_date);

    if (!result) {
      req.flash("message", "닐짜와 시간을 현재 시간보다 낮게 잡을 수 없습니다.");
      return res.redirect("/votings/new");
    }

    const setArr = new Set(vote_content);

    if (vote_content.length !== setArr.size) {
      req.flash("message", "내용이 중복되면 안됩니다.");
      return res.redirect("/votings/new");
    }

    const voteOptions = [];
    const creator = req.session.user.user_email;
    const expirationDate = new Date(vote_expiration_date).toISOString();

    for (const value of vote_content) {
      voteOptions.push({ vote_content: value, voter: [] });
    }

    const user = await User.findOne({ user_email: creator }).lean();
    const newVote = await Vote.create({
      vote_user: user._id,
      vote_title: vote_title,
      vote_options: voteOptions,
      vote_expiration_date: expirationDate,
      vote_completed: false,
    });

    await User.updateOne({ user_email: creator }, { user_votes: newVote._id });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getShowVoting = async (req, res, next) => {
  try {
    let isSameUser = false;
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

    res.render("showVoting", {
      isLogin : flag,
      vote,
      userId,
      isSameUser,
    });
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

    let dupleChecked = false;

    for (const option of vote.vote_options) {
      if (option.voter.includes(user_email)) {
        dupleChecked = true;
      }
    }

    let isSameUser = false;

    if (user_email === user.user_email) {
      isSameUser = true;
    }

    if (dupleChecked) {
      req.flash("message", "중복 투표를 할 수 없습니다!");
      const sendMessage = req.flash("message");

      return res.render("showVoting", {
        isLogin : true,
        vote,
        userId,
        isSameUser,
        flashMessage: {
          message: sendMessage,
        },
      });
    }

    for (const option of vote.vote_options) {
      if (option.vote_content === vote_checked) {
        option.voter.push(user_email);
        vote.save();
      }
    }

    res.render("showVoting", {
      isLogin : true,
      vote,
      userId,
      isSameUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyVoting = async (req, res, next) => {
  try {
    const { user_email } = req.session.user;
    const user = await User.findOne({ user_email: user_email }).lean();
    const votes = await Vote.find({ "_id": { $in: user.user_votes }});
    const voteList = [];

    for (const data of votes) {
      const user = await User.findOne({ _id: data.vote_user });

      if (!user) {
        return res.render("index", {
          isLogin : true,
          voteList,
        });
      }

      const result = checkTime(data.vote_expiration_date);

      if (!result) {
        await Vote.findOneAndUpdate(
          { _id: data._id },
          { vote_completed: true },
        );
      }

      const userId = user.user_email.split("@")[0];
      const formatDate = data.vote_expiration_date.toISOString().split("T")[0];

      voteList.push({
        _id: data._id,
        vote_title: data.vote_title,
        vote_completed: result ? data.vote_completed : true,
        vote_user: userId,
        vote_expiration_date: formatDate,
      });
    }

    voteList.reverse();

    res.render("myVoting", { isLogin : true, voteList });
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const deleteVote = await Vote.findOneAndDelete({ _id: req.params.id });

    req.flash("message", `[ ${deleteVote.vote_title} ] 투표를 삭제했습니다.`);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
