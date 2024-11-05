import { instance } from "../index.js";
import trycatch from "../middlewares/trycatch.js";
import { courses } from "../models/courses.js";
import { lecture } from "../models/lecture.js";
import { User } from "../models/User.js";
import { rm } from "fs";



import crypto from "crypto";
import { payment } from "../models/payment.js";


export const getallcourses = trycatch(async(req,res)=>{
  const courses = await courses.find()

  res.json({
    courses,
  });

});


export const getsinglecourse = trycatch(async(req,res)=>{
  const course = await courses.findById(req.params.id)


  res.json({
    course,
  })
});


export const fetchlectures = trycatch(async(req,res)=>{
  const lectures = await lecture.find({course:req.params.id})

  const user = await User.findById(req.user._id)


  if(user.role==="admin"){
    return res.json({lectures});
  }


  if(!user.subscription.includes(req.params.id))
    return res.status(400).json({
  message : "you Have Not Subscribed to this course",
  });

  res.json({lectures})
});



export const fetchlecture = trycatch(async(req,res)=>{


  const lecture = await lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);


  if(user.role==="admin"){
    return res.json({lecture});
  }


  if(!user.subscription.includes(req.params.id))
    return res.status(400).json({
  message : "you Have Not Subscribed to this course",
  });

  res.json({lecture})




})


export const getmycourses = trycatch(async(req,res)=>{
  const courses = await courses.find({_id:req.user.subscription})

  res.json({

    courses,

  });
});


export const checkout = trycatch(async(req,res)=>{
  const user = await User.findById(req.user._id)


  const course = await courses.findById(req.params.id)

  if(user.subscription.includes(course._id)){
    return res.status(400).json({
      message: "you already have this course",
    });
  }

  const options = {
    amount : Number(course.price * 100 ),
    currency: "INR",
  }

  const order = await instance.orders.create(options);

  res.status(201).json({

    order,
    course,
  });




  
});


export const paymentverification = trycatch(async(req,res)=>{

  const {razorpay_order_id,razorpay_payment_id,
    razorpay_signature
  } = req.body;


  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedsignature = crypto.createHmac("sha256",process.env.razorpay_secret).update(body).digest("hex");


  const isAuthentic = expectedsignature === razorpay_signature ;

  if(isAuthentic){


    await payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    const user = await User.findById(req.user._id)
    const course = await courses.findById(req.params.id)

    user.subscription.push(course._id)

    await user.save()

    res.status(200).json({
      message: "Course purchased!!",
    })


  }
  else{
    return res.status(400).json({
      message : "Payment Failed",
      
    });
  }



});