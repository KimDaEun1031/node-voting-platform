const mongoose = require("mongoose");

const voteOptionsSchema = new mongoose.Schema(
  {
    vote_content: {
      type: String,
      required: true,
    },
    voter: [
      {
        type: String,
      }
    ]
  }
);

const voteSchema = new mongoose.Schema(
  {
    vote_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vote_title: {
      type: String,
      required: true,
    },
    vote_options: [voteOptionsSchema],
    vote_expiration_date: {
      type: Date,
      required: true,
      min: Date.now(),
      max: Date.now() + 30,
      default: Date.now(),
    },
    vote_completed: {
      type: Boolean,
      default: false,
    }
  }
);

module.exports = mongoose.model("Vote", voteSchema);
