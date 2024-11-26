const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const Note = new Schema({
    id: ObjectId,
    title: String
})

module.exports = mongoose.model("User", Note)

