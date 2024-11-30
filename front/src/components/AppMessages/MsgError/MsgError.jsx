import PropTypes from 'prop-types'
import './MsgError.sass'

export default function MsgError(props) {

    return <>
        <div className="errorMsg" >Ошибка: {props.msg}</div>
    </>
}

MsgError.propTypes = {
    msg: PropTypes.string
}