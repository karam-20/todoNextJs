import { asyncError, errorHandler } from "../../middlewares/error"
import { Task } from "../../models/task"
import { checkAuth, connectDB } from "../../utils/features"

const handler = asyncError(async(req,res)=> {
    await connectDB()
    if(req.method!=="POST") return errorHandler(res,400,"Only post method is allowed")

    const {title,description} = req.body;
    if(!title || !description) return errorHandler(res,400,"Please provide all fields")

    const user =await checkAuth(req,res)

    if(!user) return errorHandler(res,401,"Login first")

  
    await Task.create({
    title,
    description,
    user: user._id
   })

    res.status(200).json({
        success:true ,
        message:"Task added successfully"
    })

})

export default handler