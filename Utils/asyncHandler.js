
const asyncHandler = (fn) => async (req ,res ,next) =>{
    try{
        return await fn(req,res,next);
    }catch(err){
        res.status(502).json({
            message : "Something went wrong",
            error : err
        });
    }
}

export default asyncHandler