const Note = require('../models/Note')
const User = require('../models/User')

const addNote = (req) => {
    const newNote = new Note()
    newNote.authorId = req.session.userInfo.userId
    newNote.title = req.body.title
    newNote.description = req.body.description || null
    newNote.isComplete = req.body.isComplete || false
    newNote.save()
    return newNote
}

const getAllNotes = async (req) => {
    const result = await Note
        .find({ authorId: req.session.userInfo.userId })
    return result
}

const getNote = async (req, id) => {
    const result = await Note
        .find({
            _id: id,
            authorId: req.session.userInfo.userId
        })
    return result
}

const removeNote = async (req, id) => {
    const result = await Note
        .findOneAndDelete({
            _id: id,
            authorId: req.session.userInfo.userId
        })
    return result
}

const updateNote = async (req, id) => {
    const result = await Note
        .findOneAndUpdate({
            _id: id,
            authorId: req.session.userInfo.userId
        }, {
            ...req.body,
            updateAt: Date.now()
        }, {
            new: true
        })
    return result
}

module.exports = { addNote, getAllNotes, getNote, removeNote, updateNote }