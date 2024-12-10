import PropTypes from "prop-types"

export const ViewNote = (props) => {
    return <div className="viewNote">
        <label htmlFor="title" className="labelInput">Заголовок заметки:</label>
        <input type="text" id="title" className="inputSpace" readOnly
            defaultValue={props.itemNote.title}
        />
        <label htmlFor="description" className="labelInput">Описание заметки:</label>
        <textarea className="inputText" rows={10}
            defaultValue={props.itemNote.description}
            readOnly />
        <button className="btn"
            onClick={() => props.setShow(false)}>Закрыть</button>
    </div>
}

ViewNote.propTypes = {
    itemNote: PropTypes.object.isRequired,
    setShow: PropTypes.func.isRequired,
}