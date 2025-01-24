import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  
  try{
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({message:"Not authorized to access this route..!"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({message:"Not authorized to access this route..!"});
    }

    const user = await User.findById(decoded.userId);

    if(!user){
      return res.status(401).json({message:"Not authorized to access this route..!"});
    }

    req.user = user; //attach user object to req object
    next();
  }
  catch(error){
    console.log('Error in protectRoute middleware',error);
    return res.status(401).json({message:"Not authorized to access this route..!"});
  } 
};

export default protectRoute;
