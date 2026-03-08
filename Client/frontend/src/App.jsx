import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setuserData } from './redux/userSlice'


export const serverurl="http://localhost:8000"

const App = () => {   
  const dispatch=useDispatch()
  useEffect(()=>{
    const getuser=async ()=>{
      try {
        const result=await axios.get(serverurl+"/api/user/current-user",
        {withCredentials:true})
        // console.log(result.data);
            dispatch(setuserData(result.data))
      } catch (error) {
        console.log(error);
          dispatch(setuserData(null))
      }
    }
    getuser()
  },[dispatch])
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