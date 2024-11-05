import mongoose, { mongo } from "mongoose";



const schema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type : String,
    required: true,
  },

  image:{
    type : String,
    required: true,

  },
  price:{
    type : Number,
    required: true,

  },

  duration:{
    type : Number,
    required: true,

  },

  category:{
    type: String,
    required: true,
  },

  createdby:{
    type:String,
    required: true,
  },

  createdAt:{
    type: Date,
    default: Date.now,
  },


});


export const courses = new mongoose.model("courses",schema);
