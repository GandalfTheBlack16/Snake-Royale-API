const Stat = require('../models/stats')
const ObjectId = require('mongodb').ObjectID
const util = require('../util/utils')

module.exports = {
    addAddStatFromUser: (req, res, next)=>{
        const stat = new Stat(req.params.userId, 1, 0)
        stat.insert().then(result => {
            const ret = {
                message: "success",
                stat: stat
            }
            res.status(200).json(ret)
        })
    },
    fetchStats: (req, res, next)=>{
        Stat.find().then(result => {
            res.status(200).json(result)
        })
    },
    getStatFromUser: (req,res,next)=>{
        const stat = new Stat(req.params.userId, 0, 0)
        stat.findOne({
            'userId': stat.user_id
        }).then(stat => {
            const ret = {
                message: "success",
                stat: stat
            }
            res.status(200).json(ret)
        })
    },
    updateStats: (req,res,next)=> {
        const formData = req.body
        const params = util.buildObjectNoNull({
            games: formData.games,
            rank: formData.rank,
        })
        Stat.updateStats({
            "_id": new ObjectId(req.params.userId)
        },
        {
            $set: params
        })
        .then(user => {
            res.status(200).json({
                message: "success",
                userId: user.user_id
            })
        })
        .catch()
    } 
}
