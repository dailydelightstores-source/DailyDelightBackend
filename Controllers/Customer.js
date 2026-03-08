import asyncHandler from "../Utils/asyncHandler.js";
import { Customer } from "../Models/Customer.js";
import sendmail from "../Nodemailer/nodemailer.js";
import otpTemplate from "../Emailtemplates/OtpTemplate.js";
import { OTP } from "../Models/Otp.js"

const Register = asyncHandler( async (req , res) => {
    const { CustomerName , CustomerNumber , CustomerEmail , CustomerPassword , EmailVariefy } = req.body

    if(CustomerName == "") return res.status(400).send("Customer Name is mandatory");
    if(CustomerNumber == "") return res.status(400).send("Customer Number is mandatory");
    if(CustomerEmail == "") return res.status(400).send("Customer Email is mandatory");
    if(CustomerPassword == "") return res.status(400).send("Customer Password is mandatory");
    if(!EmailVariefy) return res.status(400).send("Please Verify Email First");


    const existedUser = await Customer.findOne({$or: [ {email: CustomerEmail},{phone: CustomerNumber}]})
    if(existedUser) return res.status(400).send("Customer Existed")
    
    const UserCreated = await Customer.create({
        firstName : CustomerName,
        phone : CustomerNumber,
        email: CustomerEmail,
        password: CustomerPassword,
    })

    return res.status(201).json({
        message: "Customer Created",
    })
})

const sendRegisterOtp = asyncHandler( async (req , res) =>{

    if(!req.body?.CustomerEmail) return res.status(400).send("Email is required");

    const existedCustomer = await Customer.findOne({email: req.body.CustomerEmail}).select(" -firstName -phone -email -password -avatar -createdAt -updatedAt");
    
    if(existedCustomer?._id){
        return res.status(400).send("Customer is already exist");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const subject = "Your OTP for Daily Delight Registration";

    const template = otpTemplate(otp);
    await sendmail(req.body.CustomerEmail,subject,template);

    await OTP.create({
        OTP : otp,
        CustomerEmail : req.body.CustomerEmail,
    })

    return res.status(200).json({
        message: "Email is send"
    })
})

const variefyOTP = asyncHandler( async (req,res) =>{

    if(!req.body?.CustomerEmail) return res.status(400).send("Email is required");
    if(!req.body?.CustomerOTP) return res.status(400).send("OTP is required");

    const variefyOTP = await OTP.findOne({
       CustomerEmail: req.body.CustomerEmail
    }).sort({ createdAt: -1 }).select(" -CustromerID -CustomerEmail -createdAt -updatedAt -__v -_id");
    
    if(variefyOTP?.OTP == req.body?.CustomerOTP) return res.status(201).json({
        message: "Variefy Email"
    })

    return res.status(400).send("Email is not variefy")
}); 

const login = asyncHandler( async(req,res) => {

    if(!req.body?.CustomerPassword) return res.status(400).send("Password is required");
    if(!req.body?.CustomerEmail) return res.status(400).send("Email is required");

    const existedCustomer = await Customer.findOne({email : req.body.CustomerEmail}).select('-createdAt -isActive -phone -updatedAt -__v');

    if(!existedCustomer) return res.status(400).send("Email not found");

    const comparePassword  = await existedCustomer.compairePassword(req.body.CustomerPassword);
    
    if(comparePassword){
        
        const token = await existedCustomer.generateToken();
        
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV, sameSite: "strict"});

        return res.status(200).json({
            message: "Successfully Login",
            result: {
                avatar: existedCustomer.avatar.url,
                email: existedCustomer.email,
                firstName: existedCustomer.firstName
            }
        })

    }else{
        return res.status(400).send("Email or password is incorrect");
    }
})

export { Register , sendRegisterOtp , variefyOTP , login }