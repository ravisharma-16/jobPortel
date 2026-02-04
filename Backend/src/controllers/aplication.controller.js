import { Application } from "../moduls/application.moduls.js";
import { Job } from "../moduls/job.moduls.js"; 

// 📌 Apply for a job
export const applyjob = async (req, res) => {
  try {
    const userid = req.user?._id;
    const jobid = req.params.id;

    if (!jobid) {
      return res.status(400).json({ message: "Invalid job id", success: false });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ job: jobid, applicant: userid });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
    }

    // Check if job exists
    const job = await Job.findById(jobid);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Create application
    const newApplication = await Application.create({
      job: jobid,
      applicant: userid
    });

    // Add to job applications
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({ message: "Application submitted", success: true });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Server error",
      success: false,
    });
  }
};


// 📌 Get all jobs a user applied for
export const getapplicantjob = async (req, res) => {
  try {
    const userid = req.user._id;

    const applicants = await Application.find({ applicant: userid })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "companyId" }
      });

    if (!applicants.length) {
      return res.status(404).json({ message: "No Applications Found", success: false });
    }

    return res.status(200).json({ applicants, success: true });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: "Failed to get user applications",
      success: false,
    });
  }
};


// 📌 Get all applications for a specific job
export const getsapplication = async (req, res) => {
  try {
    const jobid = req.params.id;

    const job = await Job.findById(jobid).populate({
      path: "applications",
      populate: { path: "applicant" }
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: "Failed to get job applications",
      success: false,
    });
  }
};


// 📌 Update application status
export const updatestatus = async (req, res) => {
  try {
    const { id: applicationid } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Invalid status", success: false });
    }

    const application = await Application.findById(applicationid);
    if (!application) {
      return res.status(404).json({ message: "Application not found", success: false });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({ message: "Status updated", success: true, application });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: "Status not updated",
      success: false,
    });
  }
};

