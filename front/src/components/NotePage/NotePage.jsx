import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchNote } from "../../store/noteSlice"
import Note from "./Note"
import './NotePage.sass'
import { fetchAuth } from "../../store/authSlice"

export const NotePage = () => {
    const { error, notes } = useSelector(state => state.note)
    // const {auth, note} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAuth())
        dispatch(fetchNote())
    }, [dispatch])


    return <>
        <p className="h1">Ваши заметки</p>
        {error && <p className="faultLoading">{error}</p>}
        <div className="notesList">
            {notes.map(note =>
                <Note noteItem={note} key={note._id} />
            )}
        </div>
    </>

}