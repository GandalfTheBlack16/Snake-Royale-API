const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
    mongoClient.connect(
    'mongodb+srv://admin:nK1qNONaTYNtTJ2N@cluster0-bgvwt.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
    ).then(client => {
        console.log('DB Connected')
        callback(client)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = mongoConnect