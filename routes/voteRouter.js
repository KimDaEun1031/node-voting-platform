const express = require('express');
const router = express.Router();

const {
  getNewVoting,
  postNewVoting,
  getShowVoting,
} = require("../controllers/voteController");

router.get('/new', getNewVoting);
router.post('/new', postNewVoting);

router.get('/:id', getShowVoting);

module.exports = router;
