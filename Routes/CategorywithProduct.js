import { Router } from "express";
import { CheckuserLoggedIn } from "../Middleware/Auth.js";
import { getCategorywithProduct , addCategorywithProduct } from "../Controllers/CategorywithProduct.js"


const router = Router();

router.route("/getCategorywithProduct").get(getCategorywithProduct);

router.route("/addCategorywithProduct").post(addCategorywithProduct);


export default router