import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentuser } from "../controller/user.controller.js"


const userroute=express.Router()

userroute.get("/current-user",isAuth,getCurrentuser)


export default userroute