import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

export default function UserMenu(props) {
    if (props.userInfo.isAuth) {
        return <>

            <NavLink to={'/note'}>
                <div className="btn btn-topMenu">Dashboard</div>
            </NavLink>
            <NavLink to={'/note'}>
                <div className="btn btn-topMenu">Notes</div>
            </NavLink>
            <NavLink to={'/note'}>
                <div className="btn btn-topMenu">Books</div>
            </NavLink>
        </>
    } else {
        return <></>
    }
}

UserMenu.propTypes = {
    userInfo: PropTypes.object
}