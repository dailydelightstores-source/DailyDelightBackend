import { Router } from "express";
import { RegisterProduct , editProduct, getProduct , searchProducts ,getProductbyCategoryId ,getProductSuggestion } from "../Controllers/Products.js";
import upload from "../Middleware/multer.js"
import { CheckuserLoggedIn } from "../Middleware/Auth.js";

const router = Router();

router.route("/registerproduct").post(upload.array('productImg', 6),CheckuserLoggedIn,RegisterProduct);

router.route("/getallProductbyCategoryID/:id").get(getProductbyCategoryId);

router.route("/getProductbyId/:id").get(getProduct);

router.route("/editproduct").post(CheckuserLoggedIn,editProduct);

router.get("/search", searchProducts);

router.get("/getproductsuggestion", getProductSuggestion);


export default router