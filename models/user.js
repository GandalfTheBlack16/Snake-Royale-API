const dbconnect = require('../util/dbconnect')

module.exports = class User{
    //constructor
    constructor(email,password,nickname,registerDate,lastLogin){
        this.email = email
        this.password = password
        this.nickname = nickname
        this.registerDate = registerDate
        this.lastLogin = lastLogin
    }

    insert() {
        const db = dbconnect.getDB()
        return db 
            .collection('Users')
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
            .collection('Users')
            .updateOne(id, params)
            .then(result => {
                console.log(result)
                return id
            })
            .catch(err => {
                console.log(err)
            })
    }

    static find(){
        const db = dbconnect.getDB()
        return db
            .collection('Users')
            .find()
            .toArray()
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findOne(filter){
        const db = dbconnect.getDB()
        return db
            .collection('Users')
            .findOne(filter)
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }
}