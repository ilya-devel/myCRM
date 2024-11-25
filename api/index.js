const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })


const ADMIN = process.env.MONGO_INITDB_ROOT_USERNAME
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD


mongoose.connect(
    `mongodb://${ADMIN}:${PASSWORD}@localhost:27017`, {
        dbName: 'myApi'
    }
).then(() => console.log('Connected!'))

const auth = require('./routes/auth')
const User = require('./models/User')

let app = express()
app.use(cookieParser())

const PORT = 10666


app.get('/', function (req, res) {
    res
        .status(200)
        .cookie('username', 'Ilya', {
            expires: new Date(Date.now() + 90000),
            httpOnly: true,
        },
        )
        .send("<h1>Hello Test</h1>")
})

app.use('/auth', auth)

app.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}.`)
})