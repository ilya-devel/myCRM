import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNote } from "../../store/noteSlice"
import Note from "./Note"
import './NotePage.sass'
import { fetchAuth } from "../../store/authSlice"
import { AddNote } from "./AddNote"
import { ViewNote } from "./ViewNote"

export const NotePage = () => {
    const { error, notes } = useSelector(state => state.note)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showViewForm, setShowViewForm] = useState(false)
    const [editNote, setEditNote] = useState({
        id: null,
        title: '',
        description: ''
    })
    const [viewNote, setViewNote] = useState({title:'', description:''})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAuth())
        dispatch(fetchNote())
    }, [dispatch])

    const editNoteFunc = (note) => {
        setShowEditForm(true)
        setEditNote(note)
    }

    const viewNoteFunc = (note) => {
        setShowViewForm(true)
        setViewNote(note)
    }


    return <>
        <p className="h1">Ваши заметки</p>
        <button onClick={() => {
            editNoteFunc(editNote)
        }} className="btn">Добавить новую заметку</button>
        {showEditForm && <AddNote setShow={setShowEditForm} itemNote={editNote} />}
        {showViewForm && <ViewNote setShow={setShowViewForm} itemNote={viewNote} />}
        {error && <p className="faultLoading">{error}</p>}
        <div className="notesList">
            {notes.map(note =>
                <Note noteItem={note}
                    dispatch={dispatch}
                    editFunc={editNoteFunc}
                    viewFunc={viewNoteFunc}
                    key={note._id} />
            )}
        </div>
    </>

}