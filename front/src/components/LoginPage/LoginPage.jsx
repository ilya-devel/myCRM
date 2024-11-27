import { useState } from 'react'
import './LoginPage.sass'
import { useNavigate } from 'react-router-dom'



export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const sendAuthData = async () => {
        const result = await fetch(`http://localhost:10666/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (!result.ok) {
            console.log(result)
            return null
        }
        return navigate('/')
    }

    return <>
        <h1>Страница авторизации</h1>

        <div className="form-login">
            <label htmlFor="email">Ваша почта: </label>
            <input className='inputSpace' type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Ваш пароль: </label>
            <input className='inputSpace' type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            <button className='btnSend' onClick={sendAuthData}>Войти</button>
        </div>
    </>
}