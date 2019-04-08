const express = require('express')
const router = express.Router()
const controller = require('../controller/user')
/**
 * Get users
 */
router.get('/', controller.getUsers)
/**
 * Get user by id
 */
router.get('/:userId', controller.getUserById)
/**
 * Add user
 */
router.post('/', controller.addUser)
/**
 * Update user by id
 */
router.put('/:userId', controller.upadateUser)

module.exports = router