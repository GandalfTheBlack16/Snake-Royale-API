const dbconnect = require('../util/dbconnect')

module.exports = class Stat{
    constructor(user_id, games, wins, top10, rank){
        this.user_id = user_id
        this.games = games
        this.wins = wins
        this.top10 = top10
        this.rank = rank
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

     update(params) {
        const db = dbconnect.getDB()
        return db 
            .collection('Stats')
            .updateOne(this.id, params)
            .then(result => {
                console.log(result)
                return this
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
            .toArray()
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }
} 