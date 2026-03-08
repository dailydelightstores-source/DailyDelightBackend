import { Router } from "express";
import { addUser , login , editUser , CheckLoggedIn} from "../Controllers/Users.js"
import { CheckuserLoggedIn } from "../Middleware/Auth.js";


const router = Router();

router.route("/adduser").post(addUser);

router.route("/user-login").post(login);

router.route("/adduser").post(editUser);

router.route("/checkloggedin").post(CheckuserLoggedIn,CheckLoggedIn);


export default router