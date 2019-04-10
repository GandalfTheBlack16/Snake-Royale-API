const express = require('express')
const bodyParser = require('body-parser') 
const app = express()

const mongoConnect = require('./util/dbconnect').mongoConnect
const user_routes = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/user', user_routes)

mongoConnect(()=>{
    app.listen(process.env.PORT || 3000)
})