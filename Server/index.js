import Express  from "express";
import dotenv from "dotenv"
import connectdb from "./Config/Connectdb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authgoogle from "./Routes/Auth.route.js";
import userroute from "./Routes/User.route.js";
import interviewroute from "./Routes/interview.route.js";
dotenv.config()
const app=Express()
const port=process.env.PORT|| 9000
app.use(
   cors({
     origin: "http://localhost:5173",
     credentials: true,
   })
 );
app.use(Express.json())
app.use(cookieParser())
app.use("/api/auth",authgoogle)
app.use("/api/user",userroute)
app.use("/api/interview",interviewroute)
app.listen(port,()=>{
   console.log("There server started",port)
   connectdb()
})