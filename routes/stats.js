const controller = require('../controller/stats')
const express = require('express')
const router = express.Router()

/**
 * Get World Stats
 */
router.get('/', controller.fetchStats)
/**
 * Get User Stats
 */
router.get('/:userId', controller.getStatFromUser)
/**
 * Initialize stats from user
 */
router.post('/:userId', controller.addAddStatFromUser)
/**
 * Update stat
 */
router.put('/:statId', controller.updateStats)

module.exports = router