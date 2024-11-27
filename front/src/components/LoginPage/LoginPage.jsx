import { useState } from 'react'
import './LoginPage.sass'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const showEmail = () => {
        console.log(email)
        console.log(password)
    }

    return <>
        <h1>Страница авторизации</h1>

        <div className="form-login">
            <label htmlFor="email">Ваша почта: </label>
            <input className='inputSpace' type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Ваш пароль: </label>
            <input className='inputSpace' type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            <button className='btnSend' onClick={showEmail}>Войти</button>
        </div>
    </>
}