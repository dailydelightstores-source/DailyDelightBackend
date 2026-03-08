import { Router } from "express";
import { AddCart , removeFromCart , removeItem , getItemfromCart , checkCart , ProductByIds} from "../Controllers/Cart.js";
import { CheckuserLoggedIn } from "../Middleware/Auth.js";


const router = Router();

router.route("/addcart").post( CheckuserLoggedIn,AddCart);

router.route("/quantityUpdate").post(CheckuserLoggedIn,removeFromCart);

router.route("/removeItem").post(CheckuserLoggedIn,removeItem);

router.route("/getItemfromCart").get(CheckuserLoggedIn,getItemfromCart);

router.route("/productbyids").post(CheckuserLoggedIn,ProductByIds);

router.route("/checkcart").post(CheckuserLoggedIn,checkCart);





export default router