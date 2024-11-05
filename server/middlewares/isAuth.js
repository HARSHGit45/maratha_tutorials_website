import jwt from "jsonwebtoken"
import { User } from "../models/User.js";

export const isAuth = async(req,res,next) => {

  try{
    const token = req.headers.token;

    if(!token) 
      return res.status(403).json({
      message: "please Login",
    });


    const decodeddata = jwt.verify(token,process.env.jwt_sec);

    req.user = await User.findById(decodeddata._id);

    next();


  }catch(error){
    res.status(500).json({
      message: "Login First"
    });
  }

};


export const isadmin =(req,res,next)=> {
  try{


    if(req.user.role !== "admin") return res.status(403).json({
      message:"you are not admin",
    });

    next();

  }catch(error)
  {
    res.status(500).json({
      message: error.message,
    })

  }
  
}
