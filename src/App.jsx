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

function App() {

  return (

    <div className='w-[85%] m-auto bg-white'>
      <NavBar />
      <ParentComponent />
      {/*  <Search/>
      <Jobs/> */}
      {/*    <Value/> */}
      <Footer />
    </div>
  )
}

export default App
