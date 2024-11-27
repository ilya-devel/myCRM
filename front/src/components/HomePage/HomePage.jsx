import { useState } from 'react'
import './HomePage.sass'

export default function HomePage() {
    const [username, setUsername] = useState(localStorage.getItem('username') || 'Гость')

    return <>
        <h1>{username}, приветствуем вас в нашем приложении myCRM</h1>
    </>
}