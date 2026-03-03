import user from '../models/User.model.js';

export const getCurrentuser=async(req,res)=>{
   try {
      const userId=req.userId;
      const user=await user.findbyId(userId)
      if (!user) {
         return res.status(404).json({message:"user does not found"})
      }
      return res.status(200).json(user)
   } catch (error) {
      return res.status(500).json({message:`get the current user failed   ${error}`})
   }
}