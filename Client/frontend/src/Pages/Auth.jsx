import React from 'react'
import { FaBrain } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Utils/firebase';
import axios from 'axios';
import { serverurl } from '../App';
function Auth() {
  const handlegoogle=async ()=>{
    try {
      const response= await signInWithPopup(auth,provider)
      let user=response.user
      let name=user.displayName
      let email=user.email
      const result=await axios.post(serverurl+"/api/auth/google",{name,email},{withCredentials:true})
      console.log(result.data);
    } catch (error) {
       console.log(error);
    }
  }
  return (
    <>
    <div className='w-full min-h-screen bg-[#f7f7f7] flex items-center justify-center px-6 py-20'>
     <motion.div 
     initial={{opacity:0 ,y:-40}}
     animate={{opacity:1,y:0}}
     transition={{duration:2}}
     viewport={false}
     className='w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-200'>
      <div className='flex items-center justify-center gap-3 mb-6'>
        <div className='bg-black text-white p-2 rounded-lg'>
        <FaBrain size={16} />
        </div>
         <h2 className='font-semibold text-lg'>Interview.AI</h2>
      </div>
      <h1 className='text-lg  font-semibold text-center leading-snug mb-4'>
        Continue with{" "}
        <span className='bg-green-100 text-sm text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
          <HiSparkles size={16} />
        AI Smart Interview
        </span>
      </h1>
      <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
        Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
      </p>
      <motion.button onClick={handlegoogle}
      whileHover={{opacity:1,scale:1.05}}
      whileTap={{opacity:1,scale:0.95}}
        className='w-full flex items-center justify-center gap-3 py-2 bg-black text-white rounded-full shadow-md'
      > <FcGoogle size={20} /> Continue with Google
      </motion.button>
     </motion.div>
    </div>
    </>
  )
}

export default Auth