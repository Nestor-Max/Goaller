const express = require('express');
const { getGoals } = require('../controller/goalController');
const router = express.Router();

router.route('/').get(getGoals);

module.exports = router;
