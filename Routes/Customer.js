import { Router } from "express";
import { Register , sendRegisterOtp , variefyOTP , login } from "../Controllers/Customer.js";

const router = Router();

router.route("/register").post(Register);

router.route("/sendRegisterOtp").post(sendRegisterOtp);

router.route("/variefyotp").post(variefyOTP);

router.route("/login").post(login);

export default router