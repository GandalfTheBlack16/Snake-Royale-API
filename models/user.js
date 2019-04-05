const dbconnect = require('../util/dbconnect')

module.exports = class User{
    //constructor
    constructor(id,email,password,nickname,registerDate,lastLogin){
        this.id = id
        this.email = email
        this.password = password
        this.nickname = nickname
        this.registerDate = registerDate
        this.lastLogin = lastLogin
    }

    insert() {
        const db = dbconnect.getDB()
        return db 
            .collection('users')
            .inserOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
}