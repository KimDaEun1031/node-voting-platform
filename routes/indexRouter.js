const express = require('express');
const router = express.Router();

const { getAllVoteList } = require("../controllers/defaultsController");
const {
  getLogin,
  getSignUp,
  postSignUp,
  postLogin,
  getLogout,
} = require("../controllers/signController");
const { getMyVoting } = require("../controllers/voteController");

router.get('/', getAllVoteList);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/signup', getSignUp);
router.post('/signup', postSignUp);

router.get('/logout', getLogout);

router.get('/my-votings', getMyVoting);

module.exports = router;
