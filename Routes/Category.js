import { Router } from "express";
import { addCategory , editCategory, getCategory , deleteCategory , getCategorybyId} from "../Controllers/Category.js";
import { CheckuserLoggedIn } from "../Middleware/Auth.js";

const router = Router();

router.route("/addcategory").post(CheckuserLoggedIn ,addCategory);

router.route("/getcategory").get(getCategory);

router.route("/getcategorybyId/:id").get(getCategorybyId);

router.route("/editcategory").post(CheckuserLoggedIn,editCategory);

router.route("/deletecategory").post(deleteCategory);

export default router