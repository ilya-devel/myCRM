import { NavLink } from "react-router-dom"

export default function LogInOut() {
    const isAuth = false
    if (isAuth) {
        return <>
            <p>Log out</p>
        </>
    } else {
        return <>
            <NavLink to={'/login'}>Log In</NavLink>
            {/* <NavLink to={'/signin'}>Sign In</NavLink> */}
        </>
    }
}