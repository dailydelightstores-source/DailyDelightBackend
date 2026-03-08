import { User } from "../Models/User.js";
import asyncHandler from "../Utils/asyncHandler.js";

const CheckuserLoggedIn = asyncHandler( async(req , res ,next) =>{
    req.data = await User.decryptToken(req.cookies.token);
    if(!req.data.email) return res.status(401).send("Invalid token");
    next();
});

const CheckcustomerLoggedIn = asyncHandler( async(req , res ,next) =>{
    console.log(res.cookie);
    next();
});


export { CheckuserLoggedIn , CheckcustomerLoggedIn }