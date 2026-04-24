import React, { useState } from 'react'
import Step1set from '../Component/Step1set';
import Step2set from '../Component/Step2set';
import Step3set from '../Component/Step3set';

function Interviewpage() {
  const [step,setStep]=useState(1);
  const[interviewdata,setInterviewData]=useState(null);
  return (
   <>
    <div className='min-h-screen bg-gray-50'>
      {/* For starting the interview data */}
       {step===1 && (
    <Step1set  onStart={(data)=>{setInterviewData(data)
          ;setStep(2)}} />
       )}
        
       {/* For interview */}
        {step===2 && (
        <Step2set Interviewdata={interviewdata}
        onFinish={(Report)=>{setInterviewData(Report);setStep(2)}}
        />
       )}
       {/* for the report */}
        {step===3 && (
        <Step3set Report={interviewdata}/>
       )}
    </div>
   </>
  )
}

export default Interviewpage