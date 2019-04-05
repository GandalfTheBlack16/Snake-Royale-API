const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
    mongoClient.connect(
    'mongodb+srv://admin:nK1qNONaTYNtTJ2N@cluster0-bgvwt.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
    ).then(client => {
        console.log('DB Connected')
        _db = client.db()
        callback()
    }).catch(err => {
        throw err
    })
}

const getDB = () => {
    if (_db)
        return _db
    throw 'DateBase Not Found'
}

exports.mongoConnect = mongoConnect 
exports.getDB = getDB