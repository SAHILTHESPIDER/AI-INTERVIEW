import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import { useSelector } from "react-redux";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import AuthModel from "../Component/AuthModel";
import { useNavigate } from "react-router-dom";
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

  return (
    <>
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
        <Navbar />
        <div className="flex-1 px-6 py-20">
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
          <div className="mb-32">
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

          </div>
        </div>
        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      </div>
    </>
  );
}

export default Home;
