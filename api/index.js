const express = require('express')

let app = express()

const PORT = 10666

app.use((error, req, res, next) => {
    console.log(req.url);
})

app.get('/', function (req, res) {
    res
    .status(200)
    .cookie('test', 'test value', {expires: new Date(Date.now() + 9000), httpOnly: true})
    .send("<h1>Hello Test</h1>")
})

app.get('/req', (req, res) => {
    res.json(req.query)
})

app.get('/res', (req, res) => {
    res.json(res.json)
})


app.listen(PORT)