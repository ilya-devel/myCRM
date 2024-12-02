import { useState } from 'react'
import './LoginPage.sass'
import { useNavigate } from 'react-router-dom'
import MsgError from '../AppMessages/MsgError'



export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const sendAuthData = async () => {
        try {
            const result = await fetch(`http://localhost:10666/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if (!result.ok) {
                result
                    .json()
                    .then(r => setError(r.error))
                    .catch(console.log('Bad request'))
                return null
            } else {
                return navigate('/')
            }
        } catch (error) {
            console.log('error')
            setError(error.message)
        }

    }

    return <>
        <p className='h1'>Страница авторизации</p>
        {error && <MsgError msg={error} setError={setError} />}
        <div className="form-login">
            <label htmlFor="email">Ваша почта: </label>
            <input className='inputSpace' type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Ваш пароль: </label>
            <input className='inputSpace' type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            <button className='btnSend' onClick={sendAuthData}>Войти</button>
        </div>
    </>
}