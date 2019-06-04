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
    drawScoreboardWebView: async (req,res,next)=>{
        let ret = []
        try {
            const stats = await Stat.find()
            const users = await User.find()
            stats.forEach((item, i) => {
                ret.push({
                    "rank": i+1,
                    "nickname": users.find(user => {return (user._id.toString() === item.user_id)}).nickname,
                    "maxScore": item.maxScore,
                    "games": item.games
                })
                res.render('scoreboard', {
                    users: ret
                })
            })

        } catch(err) {
            if (!err.statusCode)
                err.statusCode = 500
            console.log(err)
        }
    }
}