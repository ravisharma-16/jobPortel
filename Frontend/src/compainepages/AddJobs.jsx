import React, { useState } from "react";
import "./AddJobs.css";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios"; 

const AddJobs = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((state) => state.company);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    skills: "",
    experience: "",
    position: "Full-time",
    jobtype: "On-site",
    requirement: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format skills into an array
    const formattedData = {
      ...jobData,
      skills: jobData.skills.split(",").map((s) => s.trim()),
    };

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/v1/job/post",
        formattedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Job Submitted:", res.data);
      alert("Job posted successfully!");
      navigate("/admin/jobs");
    } catch (error) {
      console.error("❌ Error posting job:", error.response?.data || error);
      alert("Failed to post job. Check console.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="postjob-container">
        <h2>Post a New Job</h2>
        <form className="postjob-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Title..."
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Describe the job role and responsibilities"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Location..."
              required
            />
          </div>

          <div className="form-group">
            <label>Salary (₹ per month)</label>
            <input
              type="number"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="Salary..."
              required
            />
          </div>

          <div className="form-group">
            <label>Select Company</label>
            <select
              name="companyId"
              value={jobData.companyId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Company --</option>
              {companies && companies.length > 0 ? (
                companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.companyname}
                  </option>
                ))
              ) : (
                <option disabled>No companies available</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, Node.js, MongoDB"
              required
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={jobData.experience}
              onChange={handleChange}
              placeholder="e.g. 2 years"
              required
            />
          </div>

          <div className="form-inline">
            <div className="form-group">
              <label>Position</label>
              <select
                name="position"
                value={jobData.position}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobtype"
                value={jobData.jobtype}
                onChange={handleChange}
              >
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Requirement</label>
            <input
              type="text"
              name="requirement"
              value={jobData.requirement}
              onChange={handleChange}
              placeholder="Bachelor's degree in CS or related field"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJobs;
