const express = require('express')
const app = express()

const mongoConnect = require('./util/dbconnect').mongoConnect
const User = require('./models/user')

app.use((req,res)=>{
    const user = new User(1,"example@domain.org", "password", "nick", "2019-04-05", "2019-04-05 12:34:35")
    user.insert()
})
mongoConnect(()=>{
    app.listen(3000)
})