import mongoose from "mongoose"

const schema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },

  description:{
    type:String,
    required: true,
  },
  video:{
    type: String,
    required: true,
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"courses"
  },
  createdat:{
    type: Date,
    default: Date.now,
  },
  
});

export const lecture = mongoose.model("lecture",schema);
