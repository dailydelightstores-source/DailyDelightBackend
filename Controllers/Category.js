import asyncHandler from "../Utils/asyncHandler.js";
import { Category } from "../Models/Category.js";
import mongoose from "mongoose";

const addCategory = asyncHandler( async (req,res) =>{
    const { name , slug } = req.body;

    if(!name) return res.status(401).send("name is mandetory");
    if(!slug) return res.status(401).send("slug is mandetory");

    if(req.data.role !== "admin") return res.status(400).send("Access denied");

    const existedCategory = await Category.findOne({
        $or: [{name} , {slug}]
    });

    if(existedCategory){
        return res.status(400).send("Category is already existed");
    }

    await Category.create({
        name,
        slug
    });

    return res.status(200).json({
        message: "Category is added successfully"
    })

});

const editCategory = asyncHandler( async (req , res) =>{

    if(req.data.role !== "admin") return res.status(400).send("Access denied");

    let { name , slug , aliases , keywords , isActive } = req.body;

    aliases = aliases.split(",").map(v => v.trim());
    keywords = keywords.split(",").map(v => v.trim());

    const existed = await Category.findOne({
        $or : [{name} , {slug}]
    });
    
    if(existed){
        await Category.updateOne(
            { 
                _id: existed._id 
            },
            {
                $set: {
                    aliases,
                    keywords,
                    isActive
                }
            },{
                upsert: false
            }
        )

        return res.status(200).json({
            message: "Category update successfully"
        })

    }

    return res.status(401).send({
        message: "Category not found"
    })

});


const getCategory = asyncHandler( async (req , res) =>{

    const data = await Category.find({}).select(' -createdAt -updatedAt -__v -slug -keywords -isActive -aliases');

    if(!data) return res.status(400).send("category not found");

    res.status(200).json({
        message: "category found",
        data
    })
});

const getCategorybyId = asyncHandler( async (req , res) =>{

    const{ id } = req.params;

    const data = await Category.findById(id).select(' -createdAt -updatedAt -__v');

    if(!data) return res.status(400).send("category not found");

    res.status(200).json({
        message: "category found",
        data
    })
});


const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid category id"
    });
  }

  const existedCategory = await Category.findById(id);

  if (!existedCategory) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  await Category.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Category deleted"
  });
});



export { addCategory , getCategory , editCategory , deleteCategory , getCategorybyId}