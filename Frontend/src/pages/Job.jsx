import React, { useState } from "react";
import axios from "axios";
import "./jobcard.css";

const Jobcard = ({ job }) => {
  const token = localStorage.getItem("token");
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    if (!token) {
      alert("Please login first to apply");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/application/apply/${job._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Applied successfully");
      setIsApplied(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="job-card">
      <h3 style={{ color: "blueviolet" }}>{job.title}</h3>
      <p><strong>Company:</strong> {job.companyId?.companyname || "Unknown"}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Skills:</strong> {job.skills?.join(", ")}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Requirement:</strong> {job.requirement}</p>
      <p><strong>Type:</strong> {job.jobtype}</p>
      <p><strong>Salary:</strong> ₹{job.salary}</p>
      <p>{job.description}</p>
      <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

      <button
        className="apply-btn"
        disabled={isApplied}
        onClick={handleApply}
      >
        {isApplied ? "Already Applied" : "Apply Now"}
      </button>
    </div>
  );
};

export default Jobcard;
