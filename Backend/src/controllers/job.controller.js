import { ApiError } from "../utils/Api_Error.js";
import { Job } from "../moduls/job.moduls.js";
import { ApiResponse } from "../utils/Api_respons.js";
import { Company } from "../moduls/company.moduls.js";
import { Application } from "../moduls/application.moduls.js"; 

// 📌 Post a Job
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      companyId,
      skills,
      experience,
      position,
      jobtype,
      requirement,
    } = req.body;

    const userId = req.user?._id; // <-- logged-in user

    if (!title || !description || !location || !salary || !companyId ||
        !skills || !experience || !position || !jobtype || !requirement) {
      throw new ApiError(400, "All fields are required");
    }

    // Check company exists
    const companyExists = await Company.findById(companyId);
    if (!companyExists) {
      throw new ApiError(404, "Company not found");
    }

    // Create job
    const newJob = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      companyId,             // ✅ required
      skills: Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()),
      experience: Number(experience),
      position,
      jobtype,
      requirement,
      created_by: userId,    // ✅ required
    });

    return res.status(201).json(new ApiResponse(201, newJob, "Job posted successfully"));
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
      data: null,
      success: false,
      errors: error.errors || [],
    });
  }
};

// 📌 Get All Jobs
export const getalljob = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim() || "";

    let query = {};
    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
          { position: { $regex: keyword, $options: "i" } },
        ],
      };
    }

   const jobs = await Job.find()
  .populate("companyId", "companyname description") // fetch company name + description
  .sort({ createdAt: -1 });

return res.status(200).json({
  success: true,
  message: jobs.length ? "Jobs fetched successfully" : "No jobs found",
  data: jobs,
});
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
          false,
          error.errors || []
        )
      );
  }
};

// 📌 Get Job by ID
export const getjobbyid = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?._id; // logged-in user (if token sent)

    const job = await Job.findById(jobId).populate(
      "companyId",
      "companyname description"
    ).lean(); // convert to plain JS object for easier modification

    if (!job) {
      throw new ApiError(404, "No job found");
    }

    // Check if user already applied
    if (userId) {
      const application = await Application.findOne({ jobId, userId });
      job.isApplied = !!application; // true if applied, false otherwise
    }

    return res
      .status(200)
      .json(new ApiResponse(200, job, "Job fetched successfully"));
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
          false,
          error.errors || []
        )
      );
  }
};

// 📌 Get Jobs created by Admin (current user)
export const getAdminjob = async (req, res) => {
  try {
    const admin = req.user._id;
    const jobs = await Job.find({ created_by: admin }).populate(
      "companyId",
      "companyname description"
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          jobs,
          jobs.length > 0 ? "Jobs fetched successfully" : "No jobs found"
        )
      );
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
          false,
          error.errors || []
        )
      );
  }
};
