
import { asyncError, errorHandler } from "../../../middlewares/error";
import { cookieSetter } from "../../../utils/features";

const handler = asyncError(async(req,res)=> {

    if(req.method!=="GET") return errorHandler(res,400,"Only get method is allowed")

   cookieSetter(res,null,false)
  
   res.status(200).json({
    success:true,
    message:`Logged out successfully`
   })
    

}) 

export default handler