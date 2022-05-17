const express = require('express');
const router = express.Router();

const {
  getNewVoting,
  postNewVoting,
  getShowVoting,
} = require("../controllers/voteController");

const {
  authentication,
} = require('../middleware/authentication');

router.get('/new', authentication, getNewVoting);
router.post('/new', authentication, postNewVoting);

router.get('/:id', getShowVoting);

module.exports = router;
