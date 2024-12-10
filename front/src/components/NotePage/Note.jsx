import PropTypes from "prop-types"
import { removeNote } from "../../store/noteSlice"

export default function Note(props) {


    return <div className="noteCard" key={props.noteItem._id}>
        <div className="noteCard__layout">
            <div className="dataLayout">
                <p className="noteId" hidden>{props.noteItem._id}</p>
                <p className="noteTitle">{props.noteItem.title}</p>
                <p className="noteDesc">{props.noteItem.description}</p>
            </div>
            <div className="btnLayout">
                <button className="btn" onClick={() => {
                    props.editFunc(props.noteItem)
                }}>Редактировать</button>
                <button className="btn" onClick={() => props.dispatch(removeNote({ id: props.noteItem._id }))}>Удалить</button>
                <button className="btn" onClick={() => {
                    props.viewFunc(props.noteItem)
                }}>Просмотр</button>
            </div>
        </div>
        <p className="noteCreated">Создано: {new Date(props.noteItem.createAt).toLocaleString()}</p>
    </div>


}


Note.propTypes = {
    noteItem: PropTypes.object,
    dispatch: PropTypes.func,
    editFunc: PropTypes.func,
    viewFunc: PropTypes.func
}