export const errorHandler = (res,statuscode = 500,message="Internal server error")=>{
    return res.status(statuscode).json({
        message,
        success:false})
}

export const asyncError = (passedFunction)=>async(req,res)=>{
    return Promise.resolve(passedFunction(req,res)).catch((err)=>{
        return errorHandler(res,500,err.message)
    })
}