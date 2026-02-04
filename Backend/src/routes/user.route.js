import { Router } from "express";
import { registerUser,loginUser,logoutUser,updateprofile } from "../controllers/user.controller.js";
import  verifyJWT  from "../middlewears/auth.cookie.js";
import { upload } from "../middlewears/multer.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",verifyJWT,logoutUser);
router.put("/updateprofile",verifyJWT,upload.single("avatar")
,updateprofile);

export default router;