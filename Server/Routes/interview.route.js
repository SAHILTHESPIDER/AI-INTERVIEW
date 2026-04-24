import isAuth from "../middleware/isAuth.js";
import express from "express";
import { upload } from "../middleware/multer.js";
import { analayzeResume } from "../controller/interview.controller.js";



const interviewroute=express.Router()

interviewroute.post("/resume",isAuth,upload.single("resume"),analayzeResume)

export default interviewroute;