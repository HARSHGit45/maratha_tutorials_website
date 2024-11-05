import trycatch from "../middlewares/trycatch.js";
import { courses } from "../models/courses.js";
import { lecture } from "../models/lecture.js";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";

export const createCourse = trycatch(async(req,res)=>{
  const{title,description,category,createdby,duration,price} =req.body

  const image = req.file;


  await courses.create({
    title,
    description,
    category,
    createdby,
    image: image?.path|| "",
    duration,
    price,


  });


  res.status(201).json({
    message: "Course Created Successfully" ,
    lecture,
  })





});



export const addlectures = trycatch(async(req,res)=>{
  const course = await courses.findById(req.params.id)


  if(!course) return res.status(404).json({
    message:"No COurse with this id",
  });

  const {title,description} = req.body

  const file = req.file

  const lecture = await lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });




  res.status(201).json({
    message:"Lecture Added"
  });






});


export const deletelecture = trycatch(async(req,res)=>{
  const lecturee = await lecture.findById(req.params.id);



  rm(lecturee.video,()=>{
    console.log("Video Removed");
  });


  await lecture.deleteOne()

  res.json({
    message: "Lecture Deleted!!"
  })


})



const unlinkasync = promisify(fs.unlink)


export const deletecourse = trycatch(async(req,res)=>{


  const course = await courses.findById(req.params.id)

  const lectures = await lecture.find({course: course._id})

  await Promise.all(
  
    lectures.map(async(lecture)=>{

      await unlinkasync(lecture.video);
      console.log("Video Deleted!");

    })
  );

  rm(course.image,()=>{
    console.log("Image Deleted");
  });


  await lecture.find({course: req.params.id}).deleteMany()

  await course.deleteOne()

  await User.updateMany({},{$pull:{subscription: req.params.id}});

  res.json({
    message:"Course Deleted",
  })


});


export const getallstats = trycatch(async(req,res)=>{
  const totalcourses = (await courses.find()).length;
  const totallectures = (await lecture.find()).length;
  const totaluser = (await User.find()).length;

  const stats ={
    totalcourses,
    totallectures,
    totaluser,
  };

  res.json({
    stats,
  });


});