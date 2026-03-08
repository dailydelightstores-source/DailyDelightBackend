import { CategorywithProductRoute } from "../Models/CategorywithProduct.js";
import asyncHandler from "../Utils/asyncHandler.js";

const getCategorywithProduct = asyncHandler( async(req , res) =>{

   const getcategoryList = await CategorywithProductRoute.find({ isActive: true })
                            .sort({ order: 1 })
                            .select("title categories products") // select fields of HomeSection
                            .populate({
                                path: "categories",
                                select: "name slug"
                            })
                            .populate({
                                path: "products",
                                select: "name discountedPrice sellingPrice brand images"
                            })
                            .lean();

    
    if(!getcategoryList) return res.status(400).send("Category list not found");

    return res.status(200).json({
        message: "Category fetch",
        getcategoryList
    })
})

const addCategorywithProduct = asyncHandler( async(req , res) =>{

    const { title , categories , products , isActive } = req.body

    if(!title) return res.status(400).send("title is mandatory")
    if(!categories) return res.status(400).send("categories is mandatory")
    if(!products) return res.status(400).send("products is mandatory")
    if(!isActive) return res.status(400).send("isActive is mandatory")

    const categoryList =  await CategorywithProductRoute.create({
        title,
        categories,
        products,
        isActive
    })

    if(!categoryList) return res.status(400).send("Category List is not created");

    return res.status(200).json({
        message: "Created successfully"
    })
})

export { getCategorywithProduct , addCategorywithProduct }