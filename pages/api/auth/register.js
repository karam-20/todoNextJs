
import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/userModel";
import { connectDB, cookieSetter, generateToken } from "../../../utils/features"
import bcrypt from "bcrypt"

const handler = asyncError(async(req,res)=> {
    await connectDB()
    if(req.method!=="POST") return errorHandler(res,400,"Only post method is allowed")
   const {name,email,password} = req.body;

   if(!name || !email || !password){
    return errorHandler(res,400,"Please provide all the fields")}
   
    let user = await User.findOne({email}) 

   if(user) return errorHandler(res,400,"User already exist please login")

    const hashedPassword = await bcrypt.hash(password,10)

   user = await User.create({name,email,password:hashedPassword})

   const token= generateToken(user._id);
   cookieSetter(res,token,true)
  
   res.status(201).json({
    success:true,
    message:"Registered Successfully",
    user
   })
    

}) 

export default handler