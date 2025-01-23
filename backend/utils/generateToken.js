import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });
  res.cookie('jwt',  token, {
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict', //prevent CSRF attacks cross-site request forgery attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
  });
  return token;
}

export default generateTokenAndSetCookie;