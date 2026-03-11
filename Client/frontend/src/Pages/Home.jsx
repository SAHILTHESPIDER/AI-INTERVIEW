import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import { useSelector } from "react-redux";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsGraphUp
} from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { HiRadio, HiSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import AuthModel from "../Component/AuthModel";
import { useNavigate } from "react-router-dom";
import evalimg from "../assets/ai-ans.png"
import hrimg from "../assets/HR.png"
import tech from "../assets/tech.png"
import confidenceimg from "../assets/confi.png"
import creditimg from "../assets/credit.png"
import resumeimg from "../assets/resume.png"
import pdfimg from '../assets/pdf.png';
import analyticsimg from '../assets/history.png'
import Footerr from "../Component/Footerr";
function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState();
  const navigate = useNavigate();
  const interview = [
    {
      id: 1,
      icon: <BsRobot size={20} />,
      step: 1,
      title: "Role & Experince Selection",
      desc: "AI Adjust difficulty based on  selected job role",
    },
    {
      id: 2,
      icon: <BsMic size={20} />,
      step: 2,
      title: "Smart Voice Interview",
      desc: "Dynamic follow-up question based on your answer",
    },
    {
      id: 3,
      icon: <BsClock size={20} />,
      step: 3,
      title: "Timer Based simulation",
      desc: "Real interview pressure with the time tracker",
    },
  ];
   const process=[
    {
      index:1,
      image:evalimg,
      icon:<BsBarChart size={20} />,
      title:"AI Answer Evalutation ",
      desc:"score communication,technical accurarcy and confidence."
    },
    {
      index:2,
      image:resumeimg,
      icon:<BsFileEarmarkText size={20} />,
      title:"Resume Based Interview ",
      desc:"Project-specific question based on resume"
    },
    {
      index:3,
      image:pdfimg,
      icon:<TbReportSearch size={20} />,
      title:"Download PDF Report ",
      desc:"Details strengths, weaknesses and improvement insights."
    },
    {
      index:3,
      image:analyticsimg,
      icon:<BsGraphUp size={20} />,
      title:"History and Evalutation ",
      desc:"Track progress with performance graphs and topics analysis"
    },
   ]
   const multiinterview=[
    {
      index:1,
      image:hrimg,
      title:"Hr Interview Mode",
      desc:"Behavioural and Communication based evalutation."
    },
    {
      index:2,
      image:tech,
      title:"Techincal Mode",
      desc:"Drop technical question based on selected role"
    },
    {
      index:3,
      image:confidenceimg,
      title:"Confidence Detection",
      desc:"Basic tone and voice analysis insights."
    },
    {
      index:4,
      image:creditimg,
      title:"Credit System",
      desc:"Unlock premium interview sessions easily."
    },
   ]
  return (
    <>
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
        <Navbar />
        <div className="flex-1 px-6 py-20">
          <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <HiSparkles size={16} className="bg-green-50 text-green-600" />
              AI Powered Smart Interview Platform
            </div>
          </div>
          <div className="text-center mb-28  ">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="text-3xl md:text-5xl font-semibold leading-tight max-w-4xl mx-auto"
            >
              Practice Interview with
              <span className="relative inline-block w-full mt-3.5 md:w-fit md:mt-0 md:mx-3">
                <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                  AI Intelligence
                </span>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className=" text-gray-500 mt-6 max-w-2xl mx-auto text-base"
            >
              Role-based mock interview with smart follow-ups, adaptive
              difficulty and real-time perfomance evalutation
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/history");
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="border border-gray-300 px-8 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Interview History
              </motion.button>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/interview");
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="bg-black  rounded-full hover:opacity-90 transition shadow-md text-white px-8 py-2"
              >
                Start Interview
              </motion.button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
            {interview.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28"
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 + index * 0.2 }}
                  whileHover={{ rotate: 2, scale: 1.06 }}
                  viewport={{once:false}}
                  className={`relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-500
        p-10 w-80 md:w-90 max-w-[90%] shadow-md hover:shadow-2xl transition-all duration-300
        ${index === 0 ? "rotate-[-4deg]" : ""}
        ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""}
        ${index === 2 ? "rotate-[-3deg]" : ""}
        `}
                >
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-500
        w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    {item.icon}
                  </div>
                  <div className="pt-10 text-center">
                    <h3 className="text-xs text-green-600 font-semibold mb-2 tracking-wider">
                      {item.step}
                    </h3>
                    <p className="text-lg font-semibold mb-3">{item.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="mb-28">
            <motion.h1
            initial={{opacity:0,y:28}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.6}}
            viewport={{once:false}}
             className="text-4xl font-semibold text-center mb-16"
            >
              Advanced AI{" "}
              <span className="text-green-600">Capablities</span>
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-10">
               {process.map((items, index)=>(
                <motion.div
                initial={{opacity:0,y:30}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:0.5, delay:index*0.1}}
                whileHover={{scale:1.02}}
                viewport={{once:false}}
                key={index} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl 
                transition-all">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                     <div className="w-full md:w-1/2 flex justify-center">
                         <img src={items.image} alt="" className="w-full h-auto object-contain max-h-64" />
                     </div>
                     <div className="w-full md:w-1/2">
                     <p className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      {items.icon}
                     </p>
                     <h3 className="font-semibold mb-3 text-xl">
                      {items.title}
                     </h3>
                     <p className="text-gray-500 text-sm leading-relaxed">
                      {items.desc}
                     </p>
                     </div>
                  
                  </div>
                     
                </motion.div>
               ))}
            </div>

          </div>
          <div className="mb-28">
            <motion.h1
            initial={{opacity:0,y:28}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.6}}
            viewport={{once:false}}
             className="text-4xl font-semibold text-center mb-16"
            >
              Multiple Interview{" "}
              <span className="text-green-600">Modes</span>
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-10">
               {multiinterview.map((items, index)=>(
                <motion.div
                initial={{opacity:0,y:30}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:0.5, delay:index*0.1}}
                whileHover={{y:-6}}
                viewport={{once:false}}
                key={index} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl 
                transition-all">
                  <div className="flex items-center justify-center gap-6">
                  <div className="w-1/2">
                    <h1 className="font-semibold text-xl mb-3">
                    {items.title}
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {items.desc}
                    </p>
                  </div>
                  <div className="w-1/2 flex justify-end">
                        <img src={items.image} alt="" className="w-28 h-28 object-contain" />
                  </div>
                  
                  </div>
                     
                </motion.div>
               ))}
            </div>

          </div>
        </div>
        </div>
        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footerr />
      </div>
    </>
  );
}

export default Home;
