import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Search from './Components/SearchDiv/Search'
import Value from './Components/ValueDiv/Value'
import Footer from './Components/FooterDiv/Footer'
import Jobs from './Components/JobDiv/Jobs'
import ParentComponent from './Components/JobSearch/JobSearch'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import HomePage from './Components/HomePage'

function App() {
  const [user, setUser] = useState(null)

  return (

    <BrowserRouter className='w-[85%] m-auto bg-white'>
      <Routes>
        <Route path='/' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/homepage' element={<HomePage user={user}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
