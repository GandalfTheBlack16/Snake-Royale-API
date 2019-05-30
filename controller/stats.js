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
            'user_id': stat.user_id
        }).then(stat => {
            res.status(200).json(stat)
        })
    },
    updateStats: (req,res,next)=> {
        const formData = req.body
        const params = util.buildObjectNoNull({
            games: formData.games,
            maxScore: formData.maxScore
        })
        Stat.update({
            "_id": new ObjectId(req.params.statId)
        },
        {
            $set: params
        })
        .then(stat => {
            res.status(200).json({
                message: "success",
                statId: req.params.statId
            })
        })
        .catch()
    } 
}
