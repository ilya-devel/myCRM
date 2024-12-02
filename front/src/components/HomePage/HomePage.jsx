import './HomePage.sass'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAuth } from '../../store/authSlice'

export default function HomePage() {
    const { loading, error, userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAuth())
    }, [dispatch])


    return <>
        {loading && <div className="loadingMsg" >Идёт загрузка</div>}
        {error && <div className="errorMsg" >Ошибка: {error}</div>}
        <p className='h1'>{userInfo.username}, приветствуем вас в нашем приложении myCRM</p>
    </>
}