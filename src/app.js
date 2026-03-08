import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin : process.env.EXCESSLIST.split(","),
    credentials: true
}))

import customerRoute from "../Routes/Customer.js"
import categoryRoute from "../Routes/Category.js"
import productRoute from "../Routes/Products.js"
import userRoute from "../Routes/Users.js"
import PostCodeRoute from "../Routes/Postcode.js"
import CartRoute from "../Routes/Cart.js"
import CategorywithProductRoute from "../Routes/CategorywithProduct.js"

app.use("/api/customer",customerRoute);

app.use("/api/Admin/category",categoryRoute);

app.use("/api/Admin/product",productRoute);

app.use("/api/Admin/user",userRoute);

app.use("/api/Admin/postcode",PostCodeRoute);

app.use("/api/Admin/cart",CartRoute);

app.use("/api/Admin/CategorywithProduct",CategorywithProductRoute);




export default app

