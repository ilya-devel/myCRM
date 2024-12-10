import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateNote } from "../../store/noteSlice"

export const AddNote = (props) => {
    const dispatch = useDispatch()
    const [editNote, setEditNote] = useState(props.itemNote || {
        id: null,
        title: '',
        description: ''
    })
    const [error, setError] = useState('')

    const saveNote = () => {
        if (editNote.title.length < 1) {
            setError('Заголовок обязателен')
        } else {
            if (!editNote.id) {
                dispatch(updateNote(editNote))
            } else {
                null
            }
        }
    }

    return <div className="editNote">
        <input type="text" readOnly value={editNote._id || ''} className="inputSpace" />
        <label htmlFor="title" className="labelInput">Заголовок заметки:</label>
        <input type="text" id="title" className="inputSpace"
            defaultValue={editNote.title}
            onChange={e => {
                if (e.target.value.length > 0 && error) {
                    setError(null)
                }
                if (e.target.value.length === 0) {
                    setError('Заголовок обязателен')
                }
                setEditNote({ ...editNote, title: e.target.value })
            }
            } />
        <p className="errMsg">{error}</p>
        <label htmlFor="description" className="labelInput">Описание заметки:</label>
        <textarea className="inputText" rows={10}
            defaultValue={editNote.description}
            onChange={e => setEditNote({ ...editNote, description: e.target.value })
            } />
        <button className="btn" onClick={saveNote}>Сохранить</button>
    </div>
}

AddNote.propTypes = {
    itemNote: PropTypes.object
}