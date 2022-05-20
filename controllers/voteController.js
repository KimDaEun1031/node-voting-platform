const Vote = require("../models/Vote");
const User = require("../models/User");

const { resultToVote, checkExpirationTime, validationDate } = require("../public/javascripts/utill");

exports.getNewVoting = (req, res, next) => {
  try {
    const userId = req.session.user.userEmail;

    res.render("newVoting", {
      isLogin : true,
      userId,
    });
  } catch (error) {
    next(error);
  }
};

exports.postNewVoting = async (req, res, next) => {
  try {
    const {
      voteTitle,
      voteContent,
      voteExpirationDate,
    } = req.body;

    if (!voteTitle || !voteContent || !voteExpirationDate) {
      req.flash("message", "모든 칸을 채워주세요.");
      return res.redirect("/votings/new");
    }

    const result = validationDate(voteExpirationDate);

    if (!result) {
      req.flash("message", "닐짜와 시간을 현재 시간보다 낮게 잡을 수 없습니다.");
      return res.redirect("/votings/new");
    }

    const setArr = new Set(voteContent);

    if (voteContent.length !== setArr.size) {
      req.flash("message", "내용이 중복되면 안됩니다.");
      return res.redirect("/votings/new");
    }

    const voteOptionList = [];
    const creator = req.session.user.userEmail;
    const expirationDate = new Date(voteExpirationDate).toISOString();

    for (const value of voteContent) {
      voteOptionList.push({ voteContent: value, voterList: [] });
    }

    const user = await User.findOne({ userEmail: creator }).lean();
    const newVote = await Vote.create({
      voteCreator: user._id,
      voteTitle: voteTitle,
      voteOptionList: voteOptionList,
      voteExpirationDate: expirationDate,
      voteCompleted: false,
    });

    await User.findOneAndUpdate(
      { userEmail: creator },
      { $push: { userVoteList: newVote._id }},
    );

    req.flash("message", `[ ${voteTitle} ] 투표를 생성했습니다.`);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getShowVoting = async (req, res, next) => {
  try {
    let isSameUser = false;
    let isLogin = false;
    let userId = "";

    if (req.session.user) {
      isLogin = true;
      userId = req.session.user.userEmail;
    }

    const vote = await Vote.findOne({ _id: req.params.id }).lean();
    const user = await User.findOne({ _id: vote.voteCreator }).lean();
    const creator = user.userEmail.split("@")[0];

    if (userId === user.userEmail) {
      isSameUser = true;
    }

    if (!vote) {
      next(error);
    }

    const result = resultToVote(vote, isSameUser);

    res.render("showVoting", {
      isLogin,
      vote,
      creator,
      userId,
      isSameUser,
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.postShowVoting = async (req, res, next) => {
  try {
    const { checkVote } = req.body;
    const { userEmail } = req.session.user;

    const vote = await Vote.findOne({ _id: req.params.id }).lean();
    const user = await User.findOne({ _id: vote.voteCreator }).lean();
    const creator = user.userEmail.split("@")[0];

    let isSameUser = false;

    if (userEmail === user.userEmail) {
      isSameUser = true;
    }

    let dupleChecked = false;

    for (const option of vote.voteOptionList) {
      if (option.voterList.includes(userEmail)) {
        dupleChecked = true;
      }
    }

    const result = resultToVote(vote, isSameUser);

    if (dupleChecked) {
      req.flash("message", "중복 투표를 할 수 없습니다!");
      const sendMessage = req.flash("message");

      return res.render("showVoting", {
        isLogin : true,
        vote,
        creator,
        userId: userEmail,
        isSameUser,
        result,
        flashMessage: {
          message: sendMessage,
        },
      });
    }

    const option = vote.voteOptionList.filter(item => item.voteContent === checkVote);

    const updateVote = await Vote.findOneAndUpdate(
      { _id: req.params.id, voteOptionList:{ $elemMatch: { _id: option[0]._id }} },
      { $push: {"voteOptionList.$.voterList": `${userEmail}`} },
      { new: true },
    );

    res.render("showVoting", {
      isLogin : true,
      vote: updateVote,
      userId: userEmail,
      isSameUser,
      result,
      creator,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyVoting = async (req, res, next) => {
  try {
    const { userEmail } = req.session.user;
    const user = await User.findOne({ userEmail: userEmail }).lean();
    const votes = await Vote.find({ "_id": { $in: user.userVoteList }}).lean();
    let voteList = [];

    for (const data of votes) {
      const user = await User.findOne({ _id: data.voteCreator }).lean();

      if (!user) {
        return res.render("index", {
          isLogin,
          votes,
        });
      }

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

    res.render("myVoting", {
      isLogin : true,
      votes,
      userId: userEmail,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    if (!req.params.id) {
      req.flash("message", "삭제할 투표가 없습니다.");
      return res.redirect("/");
    }

    const deleteVote = await Vote.findOneAndDelete(
      { _id: req.params.id },
      { new: true },
    );

    await User.findOneAndUpdate(
      { userEmail: req.session.user.userEmail },
      { $pull: { userVoteList: deleteVote._id }},
    );

    req.flash("message", `[ ${deleteVote.voteTitle} ] 투표를 삭제했습니다.`);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
