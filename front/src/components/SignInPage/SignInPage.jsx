import { useState } from 'react'
import './SignInPage.sass'
import { useNavigate } from 'react-router-dom'
import MsgError from '../AppMessages/MsgError'

export const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const sendSignInData = async () => {
        try {
            const result = await fetch(`http://localhost:10666/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                })
            })
            if (!result.ok) {
                result
                    .json()
                    .then(r => {
                        console.log(r)
                        setError(r.error)
                    })
                    .catch(console.log('Bad request'))
            } else {
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
                            .then(r => {
                                console.log(r)
                                setError(r.error)
                            })
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
        } catch (error) {
            console.log('error')
            setError(error.message)
        }
    }


    return <>
        <p className="h1">Создать нового пользователя</p>
        {error && <MsgError msg={error} setError={setError} />}
        <div className="form-signin">
            <label htmlFor="email">Ваша почта: </label>
            <input className='inputSpace' type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="username">Ваш логин: </label>
            <input className='inputSpace' type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} />
            <label htmlFor="password">Ваш пароль: </label>
            <input className='inputSpace' type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password">Повторите пароль: </label>
            <input className='inputSpace' type="password" name="confirmPassword" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
            <button className='btnSend' onClick={sendSignInData} >Зарегистрироваться</button>
        </div>
    </>
}