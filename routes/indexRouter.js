const express = require("express");
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

const { isLogin } = require("../middleware/authentication");
const {
  validateSignUpForm,
  validateLoginForm,
} = require("../middleware/validation");

router.get("/", getAllVoteList);

router.get("/login", getLogin);
router.post("/login", validateLoginForm, postLogin);

router.get("/signup", getSignUp);
router.post("/signup", validateSignUpForm, postSignUp);

router.get("/logout", isLogin, getLogout);

router.get("/my-votings", isLogin, getMyVoting);

module.exports = router;
