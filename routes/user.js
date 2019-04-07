const express = require('express')
const router = express.Router()
const controller = require('../controller/user')
/**
 * Get users
 */

router.get('/', (req,res,next) => {
    controller.getUsers(users => {
        res.status(200).json(users)
    })
    
})

router.get('/:userId', (req,res,next) => {
    controller.getUserById(req.params.userId, user => {
        res.status(200).json(user)
    })
})

router.post('/', (req,res,next) => {
    const formData = req.body
    controller.addUser(formData.email, formData.password, formData.nickname, user=>{
        const response = {
            message: "User created succesfully",
            user: user
        }
        res.status(201).json(response)
    })
  })

router.put('/:userId', (req,res,next) => {
    const formData = req.body
    const id = req.params.userId
    controller.upadateUser(id, formData.email, formData.password, formData.nickname, formData.lastLogin, ()=>{
        const response = {
            message: "User updated successfully",
            userId: id
        }
        res.status(200).json(response)
    })
})

module.exports = router