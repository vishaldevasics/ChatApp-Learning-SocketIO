import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  
  try {
    const {firstName,lastName,username,password,confirmPassword,gender}=req.body;
    if(password!==confirmPassword){
      return res.status(400).json({message:"Password and confirm password do not match..!"});
    }

    const user = await User.findOne({userName:username});
    if(user){      
      return res.status(400).json({message:"User already exists..!"});
    }

    //Hash password here
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //https://avatar.iran.liara.run/username?username=${firstName}+${lastName} https://avatar.iran.liara.run/public/girl https://avatar.iran.liara.run/public/boy

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    
    const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

    const newUser = new User({
      firstName,
      lastName,
      userName:username,
      password:hashedPassword,
      gender,
      profilePic : gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if(newUser){

      // generateToken(newUser._id,res);

      await newUser.save();

      res.status(201).json({
        _id:newUser._id,
        firstName:newUser.firstName,
        lastName:newUser.lastName,
        userName:newUser.userName,
        profilePic:newUser.profilePic,
        message:"User created successfully..!"
      });
    }
    else{
      res.status(500).json({message:"Internal Server Error"});
    }
  }
  catch(error){
    console.log('Error in signup controller',error);
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const login = async(req, res) => {
  try{
    const {username,password}=req.body;

    const user = await User.findOne({userName:username});
    
    const isPasswordValid = await bcrypt.compare(password,user?.password || "");
    
    if(!user || !isPasswordValid){
      return res.status(400).json({message:"Invalid username or password..!"});
    }
    if(user){
      generateTokenAndSetCookie(user._id,res);
      res.status(200).json({
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        userName:user.userName,
        profilePic:user.profilePic,
        message:"User logged in successfully..!"
      });
  }
  }
  catch(error){
    console.log('Error in login controller',error);
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const logout = (req, res) => {
  try{
    res.cookie('jwt','',{maxAge:0}); //remove cookie
    res.status(200).json({message:"User logged out successfully..!"});
  }
  catch(error){
    console.log('Error in logout controller',error);
    res.status(500).json({message:"Internal Server Error"});
  }
}