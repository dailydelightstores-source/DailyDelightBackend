import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        avatar: {
            public_id: {
                type: String,
                default: "",
            },
            url: {
                type: String,
                default: "",
            },
        },

        AccessToken: {
            type: String,
        },

        AccessTokenExpiry: {
            type: Date
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

customerSchema.pre("save", async function(next) {
    
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password,10)
});

customerSchema.methods.compairePassword = async function(password){

    return await bcrypt.compare(password,this.password);
};

customerSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
};


customerSchema.statics.decryptToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};


export const Customer = mongoose.model('Customer', customerSchema);