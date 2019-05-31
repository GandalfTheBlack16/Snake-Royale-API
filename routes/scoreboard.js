const controller = require('../controller/stats')
const express = require('express')
const router = express.Router()

router.get('/scoreboard', controller.drawScoreboardWebView);

module.exports = router