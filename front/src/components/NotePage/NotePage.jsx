import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const NotePage = () => {
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!userInfo.isAuth) {
        navigate('/login')
    }

    return <>
        <p className="h1">Ваши заметки</p>
    </>
}