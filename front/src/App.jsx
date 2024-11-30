// import './App.css'
import './App.sass'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import TopMenu from "./components/TopMenu/TopMenu"
import LoginPage from './components/LoginPage/LoginPage'


function App() {
  return (
    <>

      <BrowserRouter>
        <TopMenu />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter >
    </>
  )
}

export default App
