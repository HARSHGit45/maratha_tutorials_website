import { User } from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendmail.js";
import trycatch from "../middlewares/trycatch.js";

export const register = trycatch(async(req,res)=>{
  const {email,name,password} = req.body;

  let user = await User.findOne({ email });



  if(user) 
    return res.status(400).json({
    message : "User Already Exists",
  });


  const hashPassword = await bcrypt.hash(password,10);


  user = {
    name,
    email,
    password : hashPassword
  }


  const otp = Math.floor(Math.random() * 1000000);

  const activationtoken =jwt.sign({

    user,
    otp,

  },
  process.env.Activation_Secret,{
    expiresIn: "5m",
  }

);


const data = {
name,
otp,
};

await sendMail(
email,
"Maratha tutorials",
data
)


res.status(200).json({
message : "Otp sent to your mail",
activationtoken,
})
});



export const verifyUser = trycatch(async(req,res)=>{

  const {otp,activationtoken} = req.body

  const verify = jwt.verify(activationtoken,process.env.Activation_Secret)

  if(!verify)return res.status(400).json({
    message : "OTP expired"
  })

  if(verify.otp !== otp )
    return res.status(400).json({
      message : "Wrong Otp"
    })



    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
    })


    res.json({
      message:"User registered"
    })

});


export const loginUser = trycatch(async(req,res)=>{
  const {email,password} = req.body

  const user = await User.findOne({email})


  if(!user) return res.status(400).json({
    message: "No User with this email",
  });

  const mathpassword = await bcrypt.compare(password,user.password);

  if(!mathpassword) return res.status(400).json({
   message : "Wrong password", 
  });


  const token = await jwt.sign({_id: user._id}, process.env.jwt_sec,{
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome Back ${user.name}!`,
    token,
    user,

  });



});


export const myprofile = trycatch(async(req,res)=>{

  const user = await User.findById(req.user._id)

  res.json({ user });


});


