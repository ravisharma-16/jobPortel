import { Router } from "express";
import {registerCompany,getallcompany,getcompanyByUserId,updatecompany} from "../controllers/company.controller.js"
import  verifyJWT  from "../middlewears/auth.cookie.js";
import { upload } from "../middlewears/multer.js";

const Companyrouter = Router();

Companyrouter.post("/registerCompany",verifyJWT,registerCompany);
Companyrouter.get("/getComapny",verifyJWT,getallcompany);
Companyrouter.get("/getComapanybyuser/:id",verifyJWT,getcompanyByUserId);
Companyrouter.patch("/updateCompany/:id",verifyJWT,updatecompany);

export default Companyrouter;