import { Router } from "express";
import {postjob,getalljob,getjobbyid,getAdminjob} from "../controllers/job.controller.js"
import  verifyJWT  from "../middlewears/auth.cookie.js";

const jobrouter = Router();

jobrouter.post("/post",verifyJWT,postjob);
jobrouter.get("/get",verifyJWT,getalljob);
jobrouter.get("/get/:id",verifyJWT,getjobbyid);
jobrouter.get("/getadminjob",verifyJWT,getAdminjob);

export default jobrouter;