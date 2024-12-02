import { NavLink, useNavigate } from "react-router-dom"
import { fetchAuth } from "../../store/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


export default function LogInOut() {
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
        dispatch(fetchAuth())
    }, [dispatch])

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

    if (userInfo.isAuth) {
        return <>
            {error && <div className="errorMsg" >Ошибка: {error}</div>}
            <button className="btn btn-topMenu" onClick={funcLogout}>
                Log out ({userInfo.username || ''})
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