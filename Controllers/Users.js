import { User } from "../Models/User.js";
import asyncHandler from "../Utils/asyncHandler.js";

const addUser = asyncHandler( async(req, res) =>{
    const { name , email , phone , password , role } = req.body;

    const existedUser = await User.findOne({email});

    if(existedUser) return res.status(400).send("User with email already Created");

    await User.create({name , email , phone , password , role})

    return res.status(200).send("user is created !!!");
})

const login = asyncHandler( async(req , res) =>{
    const {email , password} = req.body;

    if(!email) return res.status(400).send("Email is required");
    if(!password) return res.status(400).send("Password is required");

    const existedUser = await User.findOne({email}).select('+password -createdAt -updatedAt -__v ')

    if(!existedUser) return res.status(401).send("User not created yet !!!");

    const checkPassword = await existedUser.compairePassword(password);

    if(!checkPassword) return res.status(401).send("Password is incorrect !!!");

    const token = await existedUser.generateToken();
    
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV, sameSite: "strict" , maxAge: 16 * 60 * 60 * 1000});
    res.cookie("name", existedUser.name, {maxAge: 16 * 60 * 60 * 1000});
    res.cookie("role", existedUser.role, {maxAge: 16 * 60 * 60 * 1000});

    return res.status(200).json({
        message: "Successfully Login"
    })

})

const editUser = asyncHandler( (req, res) =>{
    return res.send("hello");
})

const CheckLoggedIn = asyncHandler( async(req , res) =>{
    return res.status(200).send("User is LoggedIn");
})

export { addUser , login , editUser ,CheckLoggedIn }