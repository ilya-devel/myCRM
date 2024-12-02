import PropTypes from 'prop-types'
import './MsgError.sass'

export default function MsgError(props) {
    setTimeout(() => {
        // document.querySelector('.errorMsg').remove()
        props.setError(null)
    }, 3000)

    return <>
        <div className="errorMsg" >Ошибка: {props.msg}</div>
    </>
}

MsgError.propTypes = {
    msg: PropTypes.string,
    setError: PropTypes.object
}