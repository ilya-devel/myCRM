import PropTypes from "prop-types"

export default function UserMenu(props) {
    if (props.userInfo.isAuth) {
        return <>
            <p>Dashboard</p>
            <p>Notes</p>
            <p>Books</p>
        </>
    } else {
        return <></>
    }
}

UserMenu.propTypes = {
    userInfo: PropTypes.object
}