import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'

export const serverurl="http://localhost:8000"

const App = () => {   
  return (
  <>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/auth' element={<Auth/>} />
  </Routes>
  </>
  )
}

export default App