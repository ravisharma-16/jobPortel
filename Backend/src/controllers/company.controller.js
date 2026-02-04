import { Company } from "../moduls/company.moduls.js";
import { ApiError } from "../utils/Api_Error.js"; 

// Register a new company

export const registerCompany = async (req, res) => {
  try {
    const { companyname, description } = req.body;

    if (!companyname || !description) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const companyExist = await Company.findOne({ companyname: companyname.trim().toLowerCase() });
    if (companyExist) {
      return res.status(409).json({ success: false, message: "Company already exists" });
    }
    console.log(companyname,description);

    const newCompany = await Company.create({
      companyname: companyname.trim().toLowerCase(),
      description,
      userId: [req.user._id], // user from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      data: newCompany,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// Get all companies of logged-in user
export const getallcompany = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({ userId: { $in: [userId] } });

    if (!companies.length) {
      throw new ApiError(404, "No companies found");
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Companies retrieved successfully",
      data: companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Get Companies Failed",
      data: null,
      success: false,
    });
  }
};

// Get company by a specific userId
export const getcompanyByUserId = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log("Getting company by id:", companyId);

    const company = await Company.findById(companyId);

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Company retrieved successfully",
      data: company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Get Company Failed",
      data: null,
      success: false,
    });
  }
};


// Update company details by ID
export const updatecompany = async (req, res) => {
  try {
    const { companyname, description, website, location } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id, 
      { $set: { companyname, description, website, location } },
      { new: true }
    );

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Company updated successfully",
      data: company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Update Company Failed",
      data: null,
      success: false,
    });
  }
};
