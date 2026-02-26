import jwt from "jsonwebtoken"

const gentoken=async()=>{
   try {
      const token=jwt.sign({userid},process.env.JWT_Secret,{expiresIn:"2d"})
      console.log(token);
      return token
   } catch (error) {
      console.log(error);
   }
}

export default gentoken