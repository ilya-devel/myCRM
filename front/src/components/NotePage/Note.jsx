import PropTypes from "prop-types"
import { removeNote } from "../../store/noteSlice"
import { useState } from "react"

export default function Note(props) {
    const [isEdit, setIsEdit] = useState(false)

    if (!isEdit) {
        return <div className="noteCard" key={props.noteItem._id}>
            <p className="noteId" hidden>{props.noteItem._id}</p>
            <p className="noteTitle">{props.noteItem.title}</p>
            <p className="noteDesc">{props.noteItem.description}</p>
            {/* <button onClick={() => setIsEdit(!isEdit)}>Edit</button> */}
            <button onClick={() => props.dispatch(removeNote({ id: props.noteItem._id }))}>Delete</button>
            <p className="noteCreated">Создано: {new Date(props.noteItem.createAt).toLocaleString()}</p>
        </div>
    }


}


Note.propTypes = {
    noteItem: PropTypes.object,
    dispatch: PropTypes.func
}