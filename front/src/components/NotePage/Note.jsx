import PropTypes from "prop-types"

export default function Note(props) {
    return <div className="noteCard" key={props.noteItem._id}>
        <p className="noteTitle">{props.noteItem.title}</p>
        <p className="noteDesc">{props.noteItem.description}</p>
        <p className="noteCreated">Создано: {new Date(props.noteItem.createAt).toLocaleString()}</p>

    </div>
}


Note.propTypes = {
    noteItem: PropTypes.object
}