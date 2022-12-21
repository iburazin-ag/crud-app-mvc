const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.CONNECT)



const startDB = async () => {
    await client.connect()
    module.exports = client.db()
    const app = require('./app')
    app.listen(process.env.PORT)
}

startDB()