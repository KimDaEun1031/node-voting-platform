const express = require('express');
const router = express.Router();

const { getAllVoteList } = require("../controllers/defaultsController");
const { getMyVoting } = require("../controllers/voteController");

const {
  getLogin,
  getSignUp,
  postSignUp,
  postLogin,
  getLogout,
} = require("../controllers/signController");

const {
  signUpAuthentication,
  loginAuthentication,
  authentication,
} = require('../middleware/authentication');

router.get('/', getAllVoteList);

router.get('/login', getLogin);
router.post('/login', loginAuthentication, postLogin);

router.get('/signup', getSignUp);
router.post('/signup', signUpAuthentication, postSignUp);

router.get('/logout', getLogout);

router.get('/my-votings', authentication, getMyVoting);

module.exports = router;
