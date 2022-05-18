const express = require('express');
const router = express.Router();

const {
  getNewVoting,
  postNewVoting,
  getShowVoting,
  postShowVoting,
} = require("../controllers/voteController");

const {
  isLogin,
} = require('../middleware/authentication');

router.get('/new', isLogin, getNewVoting);
router.post('/new', isLogin, postNewVoting);

router.get('/:id', getShowVoting);
router.post('/:id',isLogin, postShowVoting);

module.exports = router;
