
import { asyncError, errorHandler } from "../../middlewares/error"
import { Task } from "../../models/task";
import { checkAuth, connectDB } from "../../utils/features";


const handler = asyncError(async(req,res)=> {
    
    if(req.method!=="GET") return errorHandler(res,400,"Only get method is allowed")

    await connectDB()

    const user =await checkAuth(req)
    if(!user) return errorHandler(res,401,"Login first")

    const todos = await Task.find({user:user._id})
  
    res.status(200).json({
        success:true,
        todos
    })
    

}) 

export default handler