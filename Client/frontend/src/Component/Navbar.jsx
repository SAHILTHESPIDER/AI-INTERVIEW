import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { RiRobot2Fill } from "react-icons/ri";
import { ImCoinDollar } from "react-icons/im";
import { FaUserAstronaut } from 'react-icons/fa';
import { useNavigate } from "react-router";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { serverurl } from '../App';
import { setuserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

export default function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const[showcreditpop,setShowCreditpop]=useState(false);
  const[showAuth,SetShowAuth]=useState(false);
  const[showuserpop,setShowUserPop]=useState(false);
   const Navigate= useNavigate();
   const dispatch=useDispatch()
   const handlelogout=async ()=>{
   try {
       await axios.get(serverurl+"/api/auth/logout",{withCredentials:true})
       dispatch(setuserData(null))
       setShowCreditpop(false)
       setShowUserPop(false)
       Navigate("/")
       console.log("sucessfull logout");
   } catch (error) {
      console.log(error);
   }}
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-6xl bg-white rounded-full shadow-sm border border-gray-200 px-8 py-2 flex justify-between items-center'
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={false}
          className='flex items-center gap-3 cursor-pointer'
        >
          <div className='bg-black text-white p-2 rounded-lg'>
            <RiRobot2Fill size={18} />
          </div>
          <h1 className='font-semibold hidden md:block text-lg'>AI Interview</h1>
        </motion.div>

        <div className='flex items-center gap-6'>
          <div className='relative'>
            <button onClick={()=>{
              if (!userData) {
                SetShowAuth(true)
                return;
              }
              setShowCreditpop(!showcreditpop),setShowUserPop(false)}}
            className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-base hover:bg-gray-200'>
              <ImCoinDollar />
              {userData?.credit || 0}
            </button>
            {showcreditpop &&(
              <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-300 rounded-xl
              p-5 z-50'>
                 <p>
                  Need more credit
                 </p>
                 <button onClick={()=>Navigate("/pricing")} className='w-full bg-black text-white py-2 rounded-lg text-sm'>Buy more credit</button>
              </div>
            )}
          </div>

          <div className='relative'>
            <button onClick={()=>{
                if (!userData) {
                  SetShowAuth(true)
                  return;
                }
              setShowUserPop(!showuserpop);setShowCreditpop(false)}} className='w-9 h-9 bg-black text-white 
            rounded-full flex items-center justify-center font-semibold'>
              {userData ? userData.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}
            </button>
            {showuserpop && (
              <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl 
              p-4 z-50'>
               <p className='text-base text-blue-500 font-medium mb-1'>{userData.name}</p>
               <button onClick={()=>Navigate("/history")}
               className='w-full text-left text-sm py-2 hover:text-black text-gray-600'
               >Interview History</button>
               <button  onClick={handlelogout}
                className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'
               > <IoLogOut /> Logout</button>
              </div>
            )}
          </div>
        </div>

      </motion.div>
      {showAuth&& <AuthModel onClose={()=>SetShowAuth(false)} />}
    </div>
  )
}