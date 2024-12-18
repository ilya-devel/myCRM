const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })
const session = require('express-session')
const { createClient } = require('redis')
const RedisStore = require('connect-redis').default
const cors = require('cors')
const auth = require('./routes/auth')
const note = require('./routes/note')
const { isAuth } = require('./validations/authValid')



let redisClient = createClient()
redisClient.connect({
    socket: {
        host: 'localhost',
        port: 6380
    },
    username: process.env.REDIS_USER,
    password: process.env.REDIS_USER_PASSWORD
}).catch(console.error)

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myCRM:",
})


const ADMIN = process.env.MONGO_INITDB_ROOT_USERNAME
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD



mongoose.connect(
    `mongodb://${ADMIN}:${PASSWORD}@localhost:27017`, {
    dbName: 'myApi'
}
).then(() => console.log('Connected!'))

let app = express()
// app.use(cookieParser())

const PORT = 10666

app.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: process.env.SECRET_KEY,
    }),
)

const corsConf = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsConf))

app.get('/', function (req, res) {
    res
        .status(200)
        .send("<h1>Hello Test</h1>")
})

app.use('/auth', auth)
app.use('/note', isAuth(), note)

app.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}.`)
})