import { Cart } from "../Models/Cart.js";
import { Products } from "../Models/Products.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { ObjectId } from "mongodb";

const AddCart = asyncHandler(async (req, res) => {

  const { productId } = req.body;

  if (!req.data.id || !productId)
    return res.status(400).send("Missing userId or productId");

  const userObjId = new ObjectId(req.data.id);
  const productObjId = new ObjectId(productId);

  const product = await Products.findById(productObjId).select(
    "name discountedPrice",
  );

  if (!product) return res.status(404).send("Product not found");

  const alreadyExists = await Cart.exists({
    user: userObjId,
    "items.product": productObjId,
  });

  if (alreadyExists) {
    return res.status(409).send("Product already in cart");
  }

  const cart = await Cart.findOneAndUpdate(
    { user: userObjId },
    {
      $push: {
        items: {
          product: productObjId,
          name: product.name,
          price: product.discountedPrice,
          quantity: 1,
        },
      },
      $inc: {
        totalItems: 1,
        totalAmount: product.discountedPrice,
      },
    },
    { upsert: true, new: true },
  );

  res.status(200).json({ message: "Added to cart", cart });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, value } = req.body;

  const userId = req.data.id;

    if (!userId || !productId)
    return res.status(400).send("Missing userId or productId");

    const userObjId = new ObjectId(userId);
    const productObjId = new ObjectId(productId);

    // 🔍 Get cart with the item
    const cart = await Cart.findOne({
    user: userObjId,
    "items.product": productObjId
    });

    if (!cart) return res.status(400).send("Product not found in cart");

    // 🎯 Find the exact item
    const item = cart.items.find(
    i => i.product.toString() === productObjId.toString()
    );

    const difference = value - item.quantity;

    // 🔄 Update quantity + totals correctly
    await Cart.findOneAndUpdate(
    { user: userObjId, "items.product": productObjId },
    {
        $set: {
        "items.$.quantity": value
        },
        $inc: {
        totalItems: difference,
        totalAmount: difference * item.price
        }
    },
    { new: true }
    );

    res.status(200).send("Quantity updated successfully");
});

const removeItem = asyncHandler( async(req , res) =>{
    const { productId } = req.body;

    const userId = req.data.id;

    if (!userId || !productId)
    return res.status(400).send("Missing userId or productId");

    const userObjId = new ObjectId(userId);
    const productObjId = new ObjectId(productId);

    // 🔍 Get cart & item
    const cart = await Cart.findOne({
    user: userObjId,
    "items.product": productObjId
    });

    if (!cart) return res.status(400).send("Product not found in cart");
    // 🎯 Get the exact item
    const item = cart.items.find(
    i => i.product.toString() === productObjId.toString()
    );

    // 🧮 Calculate totals to subtract
    const itemsToRemove = item.quantity;
    const amountToRemove = item.quantity * item.price;

    // ❌ Remove item + fix totals
    await Cart.findOneAndUpdate(
    { user: userObjId },
    {
        $pull: {
        items: { product: productObjId }
        },
        $inc: {
        totalItems: -itemsToRemove,
        totalAmount: -amountToRemove
        }
    },
    { new: true }
    );

    res.status(200).send("Product removed from cart");
})

const getItemfromCart = asyncHandler( async(req, res) =>{

    const CartData = await Cart.findOne({user: new ObjectId(req.data.id)}).populate({path: "items.product", select: "name discountedPrice sellingPrice brand images"}).lean();

    if(!CartData) return res.status(400).send("Product not found in cart");

    res.status(200).json({
        message: "Product Found",
        result: CartData
    })
})

const checkCart = asyncHandler( async( req,res) =>{

    const { productId } = req.body;

    if (!req.data.id || !productId)
      return res.status(400).send("Missing userId or productId");

    const userObjId = new ObjectId(req.data.id);
    const productObjId = new ObjectId(productId); 

    const checkinCart = await Cart.findOne({
      $and : [{user: userObjId} , {'items.product' : productObjId}]
    })

    if(!checkinCart) return res.status(400).send("Product not in cart");

    return res.status(200).json({
      message: "Product present in cart"
    })

})
  
const ProductByIds = asyncHandler( async( req , res ) =>{
  
  const { ProductIds } = req.body;

  const result = await Products.find({
    _id: {
      $in: ProductIds
    }
  }).select('name discountedPrice sellingPrice brand images availableIn')

  

  if(result.length == 0){
    return res.status(400).send("Cart is empty")
  }

  return res.status(200).json({
    message: "Data fetch",
    result
  })
})

export { AddCart , removeFromCart , removeItem , getItemfromCart , checkCart , ProductByIds };
