const express = require('express')
const auth = require('./routes/auth')

let app = express()

const PORT = 10666



app.get('/', function (req, res) {
    res
    .status(200)
    .cookie('test', 'test value', {expires: new Date(Date.now() + 9000), httpOnly: true})
    .send("<h1>Hello Test</h1>")
})

app.use('/auth', auth)

app.listen(PORT)