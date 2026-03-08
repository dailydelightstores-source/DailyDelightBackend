import { Router } from "express";
import { getPostcode , AddPostcode } from "../Controllers/Postcode.js";

const router = Router();

router.route("/getpostcode").get(getPostcode);

router.route("/addpostcode").post(AddPostcode);

export default router