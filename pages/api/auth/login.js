
import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/userModel";
import { connectDB, cookieSetter, generateToken } from "../../../utils/features"
import bcrypt from "bcrypt"

const handler = asyncError(async(req,res)=> {
    await connectDB()
    if(req.method!=="POST") return errorHandler(res,400,"Only post method is allowed")
   const {email,password} = req.body;

   if(!email || !password){
    return errorHandler(res,400,"Please provide all the fields")}
   
    const user = await User.findOne({email}).select("+password")

   if(!user) return errorHandler(res,400,"Invalid email and password")

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) return errorHandler(res,400,"Invalid email and password")

   const token= generateToken(user._id);
   cookieSetter(res,token,true)
  
   res.status(200).json({
    success:true,
    message:`Welcome back ${user.name}`,
    user
   })
    

}) 

export default handler