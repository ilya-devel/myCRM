import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchNote } from "../../store/noteSlice"
import Note from "./Note"
import './NotePage.sass'

export const NotePage = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.note)
    // const {auth, note} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchNote())
    }, [dispatch])

    if (!userInfo.isAuth) {
        navigate('/login')
    }

    return <>
        <p className="h1">Ваши заметки</p>

        <div className="notesList">
            {notes.map(note => <>
                <Note noteItem={note} />
            </>)}
        </div>
    </>
}