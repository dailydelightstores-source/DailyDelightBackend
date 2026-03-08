import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "manager", "sales"],
      default: "sales"
    },

    permissions: {
      type: [String],
      default: []
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {   
    
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password,10)
});

userSchema.methods.compairePassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
};


userSchema.statics.decryptToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const User = mongoose.model("User", userSchema);