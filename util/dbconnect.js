const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
    mongoClient.connect(process.env.MONGOLAB_URI,
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