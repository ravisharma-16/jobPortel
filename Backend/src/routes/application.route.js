import { Router } from "express";
import verifyJWT from "../middlewears/auth.cookie.js";
import {
  applyjob,
  getapplicantjob,
  getsapplication,
  updatestatus
} from "../controllers/aplication.controller.js";

const application_route = Router();

// Apply for a job → should be POST
application_route.post("/apply/:id", verifyJWT, applyjob);

// Get all jobs the logged-in user applied for
application_route.get("/get", verifyJWT, getapplicantjob);

// Get all applications for a specific job (admin/employer)
application_route.get("/:id/applicants", verifyJWT, getsapplication);

// Update application status (admin)
application_route.post("/status/:id/update", verifyJWT, updatestatus);

export default application_route;
