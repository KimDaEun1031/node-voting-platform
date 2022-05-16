const mongoose = require("mongoose");
const User = require('./User');

const voteOptionsSchema = new mongoose.Schema(
  {
    vote_check_title: {
      type: String,
      required: true,
    },
    vote_checked: {
      type: Boolean,
      default: false,
    }
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
      min: Date.now() - 1,
      max: Date.now() - 30,
    },
    vote_completed: {
      type: Boolean,
      default: false,
    }
  }
);

module.exports = mongoose.model("Vote", voteSchema);
