const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.loginUser = async(userData) => {
  try {
    let user = await User.findOne({where:{email:userData.email}});
    if(!user){
      return {code: 400, message:'Invalid Email or Password'};
    }
    let isMatch = await user.comparePassword(userData.password);
    if(!isMatch) {
      return { code: 400, message: 'Invalid Username or Password' };
    }
    const payload = {
      id: user.userid,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:'1h' });
    if(token){
      return {code: 200, message:{token}}
    }else {
      throw new Error('Unable to signin');
    }
    
  } catch(err) {
    console.error(err.message);
    return {code: 500, message: 'Internal Server Error'};
  }
  
}