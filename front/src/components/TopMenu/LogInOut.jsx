import { NavLink, useNavigate } from "react-router-dom"
import { fetchAuth } from "../../store/authSlice"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import PropTypes from "prop-types"


export default function LogInOut(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const funcLogout = async () => {
        const result = await fetch(`http://localhost:10666/auth/logout`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            credentials: 'include',
        })
        console.log(result.ok)
        if (!result.ok) {
            setError(result.message)
        } else {
            dispatch(fetchAuth())
            return navigate('/')
        }
        return null
    }

    if (props.userInfo.isAuth) {
        return <>
            {error && <div className="errorMsg" >Ошибка: {error}</div>}
            <button className="btn btn-topMenu" onClick={funcLogout}>
                Log out ({props.userInfo.username || ''})
            </button>
        </>
    } else {
        return <>
            <NavLink to={'/login'}><div className="btn btn-topMenu">
                Log In
                </div></NavLink>
            <NavLink to={'/signin'}><div className="btn btn-topMenu">
                Sign In
                </div></NavLink>
        </>
    }
}

LogInOut.propTypes = {
    userInfo: PropTypes.object
}