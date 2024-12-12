const express = require('express')
const Note = require('../models/Note')
const { hasUser, isAuth } = require('../validations/authValid')
const { addNote, getAllNotes, getNote, updateNote, removeNote } = require('../services/noteService')
const { checkNote } = require('../validations/noteValid')
const { noteScheme } = require('../schemes/noteScheme')


const router = express.Router()
router.use(express.json())


router.get('/', async (req, res) => {
    const result = await getAllNotes(req)
    res
        .status(200)
        .json({
            notes: result,
            message: 'Ваши заметки'
        })
})

router.get('/:id', async (req, res) => {
    const result = await getNote(req, req.params.id)
    res
        .status(200)
        .json({
            message: `Ваша заметка с id: ${req.params.id}${result.length ? '' : ' не найдена'}`,
            notes: result,
        })
})

router.post('/', checkNote(noteScheme), (req, res) => {
    const result = addNote(req)
    res
        .status(201)
        .json({
            // message: `Заметка добавлена с id: ${result._id}`,
            // note: { ...result.toJSON() }
            ...result.toJSON()
        })
})

router.put('/:id', checkNote(noteScheme), async (req, res) => {
    const result = await updateNote(req, req.params.id)
    res
        .status(201)
        .json({
            ...result.toJSON()
        })
})

router.delete('/:id', async (req, res) => {
    const result = await removeNote(req, req.params.id)
    res
        .status(201)
        .json({
            message: `Заметка с id ${result._id} была удалена`,
            note: { ...result.toJSON() }
        })
})


module.exports = router