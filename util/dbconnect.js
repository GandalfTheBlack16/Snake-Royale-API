const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
    mongoClient.connect(
    'mongodb://restapi:1234qwer@ds135726.mlab.com:35726/heroku_7z95wdgw',
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