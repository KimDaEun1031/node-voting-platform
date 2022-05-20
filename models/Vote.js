const mongoose = require("mongoose");

const voteOptionListSchema = new mongoose.Schema(
  {
    voteContent: {
      type: String,
      required: true,
      default: "",
    },
    voterList: [
      {
        type: String,
      }
    ]
  }
);

const voteSchema = new mongoose.Schema(
  {
    voteCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voteTitle: {
      type: String,
      required: true,
    },
    voteOptionList: [voteOptionListSchema],
    voteExpirationDate: {
      type: Date,
      required: true,
      min: Date.now(),
      default: Date.now(),
    },
    voteCompleted: {
      type: Boolean,
      default: false,
    }
  }
);

module.exports = mongoose.model("Vote", voteSchema);
