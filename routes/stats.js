const controller = require('../controller/stats')
const express = require('express')
const router = express.Router()

/**
 * Get World Stats
 */
router.get('/', controller.fetchStats)
/**
 * Initialize stats from user
 */
router.post('/:userId', controller.addAddStatFromUser)

module.exports = router