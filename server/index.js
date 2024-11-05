import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";  // Moved this import to the top
import { connectDb } from "./database/db.js";
import razorpay from "razorpay";
import cors from "cors";


dotenv.config();


export const instance = new razorpay({
  key_id: process.env.razorpay_key,
  key_secret: process.env.razorpay_secret,
});

const app = express();
const port = process.env.PORT ;



app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send("Server is working");
});


app.use("/uploads", express.static("uploads"));





//import routes

import userRoutes from "./routes/user.js"
import coursesRoutes from './routes/course.js'
import adminRoutes from  './routes/admin.js'


//using routes

app.use('/api',userRoutes);
app.use('/api',coursesRoutes);
app.use('/api',adminRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
