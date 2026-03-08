import mongoose from "mongoose";
import { Products } from "../Models/Products.js";
import asyncHandler from "../Utils/asyncHandler.js"
import { Category } from "../Models/Category.js";
import imagekit from "../Utils/Imagekit.js"

const RegisterProduct = asyncHandler( async (req,res) =>{
    if(!req.body?.name) return res.status(400).send("name is mandatory");
    if(!req.body?.slug) return res.status(400).send("slug is mandatory");
    if(!req.body?.discountedPrice) return res.status(400).send("discountedPrice is mandatory");
    if(!req.body?.purchasingPrice) return res.status(400).send("purchasingPrice is mandatory");
    if(!req.body?.sellingPrice) return res.status(400).send("sellingPrice is mandatory");
    if(!req.body?.category) return res.status(400).send("category is mandatory");
    if(!req.body?.availableIn) return res.status(400).send("Postcode is mandatory");

    if(req.data.role !== "admin") return res.status(400).send("Access denied");

    const existedProduct = await Products.findOne({
        $or: [ {name : req.body.name} , {slug :req.body.slug} ]
    });

    if(existedProduct) return res.status(400).send("Product is already existed");

    const images = [];

    for (const file of req.files) {

      const uploaded = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "products"
      });

      images.push({
        url: uploaded.url,
        alt: req.body.name
      });

    }
    
    await Products.create({
        name : req.body.name,
        slug: req.body.slug,
        discountedPrice: req.body.discountedPrice,
        purchasingPrice: req.body.purchasingPrice,
        sellingPrice: req.body.sellingPrice,
        category: req.body.category,
        description: req.body?.description || "",
        brand: req.body?.brand || "",
        images: images,
        availableIn: [].concat(req.body.availableIn)
    })

    res.status(200).json({
        message: "Product saves successfully"
    })
});

const editProduct = asyncHandler( async (req , res) =>{
    const { name , slug , description , discountedPrice , purchasingPrice , sellingPrice , brand , stock , isActive , availableIn } = req.body;

    if(!name) return res.send("name is mandatory")

    if(!slug) return res.send("slug is mandatory")
    
    if(req.data.role !== "admin") return res.status(400).send("Access denied");

    const existedProduct = await Products.findOneAndUpdate(
        { $and: [ {name} , {slug} ] },
        { $set:{
            description,
            discountedPrice,
            purchasingPrice,
            sellingPrice,
            brand,
            stock,
            isActive,
            availableIn
        }},
        { upsert: false , returnDocument: "after" }
    )

    if(!existedProduct) return res.status(400).send("Product not found");

    return res.status(200).json({
        message: "Product updated"
    });
})

const getProduct = asyncHandler( async(req , res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.send("invalid product id")

    const product = await Products.findById(id).select(' -createdAt -updatedAt -__v');

    if(!product) return res.status(400).send("Product not found")

    return res.status(200).json({
        message: "Product found",
        product
    })
});

const getProductbyCategoryId = asyncHandler( async(req , res) =>{

    const productData = await Products.find({category: new mongoose.Types.ObjectId(req.params.id)}).select(' -slug -description -discountedPrice -purchasingPrice -sellingPrice -category -brand -images -stock -isActive -createdAt -updatedAt -__v -availableIn');

    if(!productData.length){
      return res.status(400).send("Product not found")
    }

    res.status(200).json({
      message: "product found",
      data: productData
    })

})

const searchProducts = asyncHandler( async (req, res) => {
  const { query, from = 0, to = 10 } = req.query;

    if (!query) return res.status(400).send("query Not found");

    // 1️⃣ Find matching categories first (intent)
    const matchedCategories = await Category.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { aliases: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } }
      ]
    }).select("_id");

    const categoryIds = matchedCategories.map(c => c._id);

    // 2️⃣ Product search (name + category intent)
    const products = await Products.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $in: categoryIds } }
      ]
    })
    .skip(Number(from))
    .limit(Number(to) - Number(from))
    .populate("category", "name slug")
    .sort({ sellingPrice: 1 })
    .select(' -isActive -slug -updatedAt -__v -createdAt -description -availableIn -category');

    res.status(200).json({
      message: "Product found",
      result: products
    });
});

const getProductSuggestion = asyncHandler( async (req, res) => {
    const { query } = req.query;

    if (!query) return res.status(400).send("query not found");

    // Match products by name (partial match)
    const products = await Products.find({
      isActive: true,
      name: { $regex: query, $options: "i" }
    })
    .limit(8)
    .select("name slug");

    if(!products.length){
      return res.status(400).send("Product not found")
    }

    res.status(200).json({
      message: "Suggestion Found",
      result: products
    })
});



export { RegisterProduct , getProduct , editProduct , searchProducts ,getProductbyCategoryId , getProductSuggestion}