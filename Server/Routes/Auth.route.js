import express from "express"
import { Googleauth, googlelogout } from "../controller/auth.controller.js"

const authgoogle=express.Router()

authgoogle.post("/google",Googleauth)
authgoogle.get("/logout",googlelogout)

export default authgoogle