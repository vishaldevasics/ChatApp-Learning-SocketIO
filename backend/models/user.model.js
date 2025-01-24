import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true, 
    },
    lastName: { 
      type: String, 
      required: true, 
    },
    userName:{
      type: String,
      required: true,
      unique: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 3
    },
    gender: { 
      type: String, 
      required: true,
      enum: ["male", "female"],
    },
    profilePic: { 
      type: String, 
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;