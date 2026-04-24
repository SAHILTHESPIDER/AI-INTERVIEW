import React from 'react'
import {motion} from 'motion/react';
import { FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt ,
  FaChartLine 

} from "react-icons/fa";

function Step1set({onStart}) {
  const interviewstart=[
    {icon:<FaUserTie />,text:"Choose Role & Experince"},
    {icon:<FaMicrophoneAlt />,text:"Smart Voice Interview"},
    {icon:<FaChartLine />,text:"Performance Analytics"},
  ]
  return (
  <>
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.6}}
    className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100
     to-gray-200 px-4 ' >
     <div className='w-full max-w-6xl  bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

      <motion.div
        initial={{opacity:0, x:-80}}
        animate={{x:0, opacity:1}}
        transition={{duration:0.7}}
        viewport={{once:false}}

      className='relative bg-gradient-to-br p-5 from-green-50 to-green-100 flex flex-col justify-center'>
       
       <h2 className=' text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
         Start AI Interview
       </h2>
       <p className='text-gray-600 mb-10'>
         practice real interview scenario powered by AI. 
         Improve communication, techincal skills and  confidence.
       </p>
       <div className='space-y-5'>
        {interviewstart.map((list, index)=>(
          <motion.div key={index} 
           initial={{opacity:0, y:30}}
           animate={{opacity:1,y:0}}
           transition={{delay:0.3+index*0.15}}
           whileHover={{scale:1.03}}

          className='flex items-center space-x-4 bg-white p-4 rounded-xl
           shadow-sm cursor-pointer
          '>
            <span className='text-green-600 text-xl'>
              {list.icon}
            </span>
        <span className='text-gray-700 font-medium  text-sm'>
          {list.text}
        </span>

          </motion.div>
        ))}

       </div>
      </motion.div>
      
      <motion.div>

      </motion.div>
     </div>
    </motion.div>
  </>
  )
}

export default Step1set