const Stat = require('../models/stats')
const User = require('../models/user')
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
    fetchStatsOrderedByScore: (req, res, next)=>{
        Stat.find().then(result => {
            if (result)
                return res.status(200).json(result)
                res.status(200).json([])
        })
    },
    getStatFromUser: (req,res,next)=>{
        const stat = new Stat(req.params.userId, 0, 0)
        stat.findOne({
            'user_id': stat.user_id
        }).then(stat => {
            if (stat)
                return res.status(200).json(stat)
            res.status(200).json([]);
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
    },
    drawScoreboardWebView: (req,res,next)=>{
        let users = []
        Stat.find().then(result => {
            if (result){
                result.forEach((item, index)=>{
                    users.push({    
                        id: item.user_id,
                        rank: index+1,
                        maxScore: item.maxScore,
                        games: item.games,
                    })
                })
            }
            return users
        }).then(users => {
            res.render("scoreboard", {
                users:users
             })
        })
    }
}
