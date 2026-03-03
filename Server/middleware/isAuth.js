import  jwt  from "jsonwebtoken";

const isAuth=async (req,res,next)=>{
   try {
      let {token}=req.cookies;
      if (!token) {
         return res.status(400).json({message:"The token not found in the cookie"})
         
      }
      const verifytoken=jwt.verify(token,process.env.JWT_Secret)
      if (!verifytoken) {
         return res.status(400).json({message:"The user does not have the valid token"})
         
      }
      req.userId= verifytoken.userId
      next()
   } catch (error) {
      console.log(error);
   }
}
export default isAuth