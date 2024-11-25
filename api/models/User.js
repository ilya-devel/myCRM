const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const user = new Schema({
    id: ObjectId,
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model("User", user)

