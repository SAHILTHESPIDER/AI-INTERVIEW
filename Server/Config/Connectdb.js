import mongoose from "mongoose";

const connectdb= async()=>{
   try {
      await mongoose.connect(process.env.MONGODB_URL)
      console.log("Conected");
   } catch (error) {
      console.log(error);
   }
}
export default connectdb;