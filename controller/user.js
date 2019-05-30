const ObjectId = require('mongodb').ObjectID
const util = require('../util/utils')
const User = require('../models/user')

module.exports = {
    addUser: (req,res,next) => {
        const timestamp = new Date().toISOString().split('T')[0]
        const formData = req.body
        const user = new User(formData.email, formData.password, formData.nickname, timestamp, "")
        user.insert()
            .then(user => {
                const response = {
                    message: "success",
                    user: user
                }
                res.status(201).json(response)
            })
    },
    getUsers: (req,res,next) => {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                throw err
            })
    },
    getUserById: (req,res,next) => {
        User.findOne({
            '_id': new ObjectId(req.params.userId)
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                throw err
            })
    },
    upadateUser: (req,res,next) => {
        const formData = req.body
        const params = util.buildObjectNoNull({
            email: formData.email,
            password: formData.password,
            nickname: formData.nickname,
            lastLogin: formData.lastLogin
        })
        User.update({
            '_id': new ObjectId(req.params.userId)
        },
        {
            $set: params
        })
        .then(id => {
            const response = {
                message: "success",
                userId: id
            }
            res.status(200).json(response)
        })
        .catch(err => {
            throw err
        })
    }
}