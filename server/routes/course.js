import express from "express"
import { checkout, fetchlecture, fetchlectures, getallcourses, getmycourses, getsinglecourse, paymentverification } from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();


router.get("/course/all",getallcourses);
router.get("/course/:id",getsinglecourse);
router.get("/lecture/:id", isAuth,fetchlectures);
router.get("/lecture/:id",isAuth,fetchlecture);
router.get("/mycourse",isAuth,getmycourses);
router.post("/course/checkout/:id",isAuth,checkout);
router.post("/verification/:id",isAuth,paymentverification);

export default router