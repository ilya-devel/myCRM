// import './App.css'
import './App.sass'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import TopMenu from "./components/TopMenu/TopMenu"
import LoginPage from './components/LoginPage/LoginPage'
import { SignInPage } from './components/SignInPage/SignInPage'
import { NotePage } from './components/NotePage/NotePage'


function App() {
  return (
    <>

      <BrowserRouter>
        <TopMenu />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/note' element={<NotePage />} />
          </Routes>
        </div>
      </BrowserRouter >
    </>
  )
}

export default App
