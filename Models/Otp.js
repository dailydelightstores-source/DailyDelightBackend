import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
    { 
        OTP:{
            type: Number,
            required: true,
            trim: true

        },

        CustomerEmail:{
            type: String,
            required: true,
            trim: true
        }

    },{
        timestamps: true
    }
);


export const OTP = mongoose.model('OTP', OtpSchema);

