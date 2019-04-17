const express = require('express')
const bodyParser = require('body-parser') 
const app = express()

//dev dependencies
try {
    require('dotenv').config();
    // do stuff
} catch (ex) {
}

const mongoConnect = require('./util/dbconnect').mongoConnect
const user_routes = require('./routes/user')
const stat_router = require('./routes/stats')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/user', user_routes)
app.use('/stat', stat_router)
mongoConnect(()=>{
    app.listen(process.env.PORT || 3000)
})