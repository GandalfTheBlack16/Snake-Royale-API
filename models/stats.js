const dbconnect = require('../util/dbconnect')

module.exports = class Stat{
    constructor(user_id, games, maxScore){
        this.user_id = user_id
        this.games = games
        this.maxScore = maxScore
    }

    insert() {
        const db = dbconnect.getDB()
        return db 
            .collection('Stats')
            .insertOne(this)
            .then(result => {
                console.log(result)
                return this
            })
            .catch(err => {
                console.log(err)
            })
    }

    static update(id, params) {
        const db = dbconnect.getDB()
        return db 
            .collection('Stats')
            .updateOne(id, params)
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }

    findOne(filter) {
        const db = dbconnect.getDB()
        return db
            .collection('Stats')
            .findOne(filter)
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    static find() {
        const db = dbconnect.getDB()
        return db
            .collection('Stats')
            .find()
            .sort({
                maxScore: -1
            })
            .toArray()
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }
} 