const ObjectId = require('mongodb').ObjectID
const util = require('../util/utils')
const User = require('../models/user')

module.exports = {
    addDummyUser: callback => {
        const dummy = new User("example@domain.org", "password", "nick", "2019-04-05", "2019-04-05 12:34:35")
        dummy.insert()
            .then(user => {
                callback(user)
            })
    },
    addUser: (email,pass,nick, callback) => {
        const timestamp = new Date().toISOString().split('T')[0]
        const user = new User(email, pass, nick, timestamp, "")
        user.insert()
            .then(user => {
                callback(user)
            })
    },
    getUsers: callback => {
        User.find()
            .then(users => {
                callback(users)
            })
            .catch(err => {
                throw err
            })
    },
    getUserById: (id,callback) => {
        User.findOne({
            '_id': new ObjectId(id)
        })
            .then(user => {
                callback(user)
            })
            .catch(err => {
                throw err
            })
    },
    upadateUser: (id, email, password, nickname, lastLogin, callback) => {
        const params = util.buildObjectNoNull({
            email: email,
            password: password,
            nickname: nickname,
            lastLogin: lastLogin
        })
        User.update({
            '_id': new ObjectId(id)
        },
        {
            $set: params
        })
        .then(
            callback()
        )
        .catch(err => {
            throw err
        })
    }
}