import asyncHandler from "../Utils/asyncHandler.js";
import {ServiceArea} from '../Models/serviceArea.js'

const getPostcode = asyncHandler( async(req , res ) => {

    const data = await ServiceArea.find().select(' -country -createdAt -state -city -isActive -createdAt -updatedAt -__v');

    if(!data) return res.state(400).send("Postcode Not found");

    return res.status(200).json({
        message: "Postcode found",
        result: data
    })
})

const AddPostcode = asyncHandler( async(req , res ) => {
    const { country , state , city , postalCodes , isActive} = req.body;

    if(!country) return res.status(400).send("country is mandatory ")
    if(!state) return res.status(400).send("state is mandatory ")
    if(!city) return res.status(400).send("city is mandatory ")
    if(!postalCodes) return res.status(400).send("postalCodes is mandatory ")

    const existedPostcode = await ServiceArea.findOne({postalCodes});

    if(existedPostcode) return res.status(400).send("Postcode already existed")

    await ServiceArea.create({
        country,
        state,
        city,
        postalCodes,
        isActive
    })

    return res.status(200).send("Successfully saved")
})

export { getPostcode , AddPostcode }