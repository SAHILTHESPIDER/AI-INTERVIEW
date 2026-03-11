import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footerr() {
  return (
    <>
    <div className='bg-[#f3f3f3] flex  justify-center items-center px-4 pb-10 py-6 pt-10 '>
      <div className='w-full bg-white rounded-3xl shadow-sm border border-gray-200 py-8 px-3 text-center'>
         <div className='flex justify-center items-center gap-3 mb-2'>
            <div  className='bg-black text-white p-2 rounded-lg'><BsRobot size={16} /></div>
            <h2 className='font-semibold'>AI Interview</h2>
         </div>
         <p>
            AI-powered interview prepration platform designed to improve communication skills, technical  depth and
            professional confidence
         </p>
         <p className='text-gray-500 text-sm mt-2'>
         © {new Date().getFullYear()}sahil gupta. All rights are reserved
         </p>
      </div>
      </div>
    </>
  )
}

export default Footerr