import express from "express"
import { loginUser, register, verifyUser,myprofile } from "../controllers/users.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = express.Router()



router.post('/user/register',register);
router.post('/user/verify', verifyUser);
router.post('/user/login',loginUser);
router.get("/user/me",isAuth,myprofile);

export default router;