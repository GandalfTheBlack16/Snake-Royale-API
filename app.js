const express = require('express')
const app = express()

const mongoConnect = require('./util/dbconnect')


mongoConnect((client)=>{
    console.log(client)
    app.listen(3000)
})
