const Stat = require('../models/stats')

module.exports = {
    addAddStatFromUser: (req, res, next)=>{
        const stat = new Stat(req.params.userId, 0, 0, 0, undefined)
        stat.insert().then(result => {
            const ret = {
                message: "Stat from user created successfully",
                stat: stat
            }
            res.status(200).json(ret)
        })
    },
    fetchStats: (req, res, next)=>{
        Stat.find().then(result => {
            res.status(200).json(result)
        })
    } 
}
