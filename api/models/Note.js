const mongoose = require('mongoose')
const User = require('./User')
const { required } = require('joi')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const note = new Schema({
    id: ObjectId,
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Note", note)

