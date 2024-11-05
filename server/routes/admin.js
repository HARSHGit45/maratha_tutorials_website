import express from "express"
import { isadmin, isAuth } from "../middlewares/isAuth.js";
import { addlectures, createCourse, deletecourse, getallstats } from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";
import { deletelecture } from "../controllers/admin.js";

const router = express.Router();


router.post('/course/new',isAuth,isadmin,uploadFiles, createCourse);

router.post('/course/:id',isAuth,isadmin,uploadFiles,addlectures);

router.delete("/lecture/:id",isAuth,isadmin,deletelecture);

router.post('/course/:id',isAuth,isadmin,deletecourse);

router.get('/stats',isAuth,isadmin,getallstats);




export default router