import React from "react";
import "./jobcard.css";

const randomCompanies = [
  "TechNova Pvt Ltd",
  "CodeCrafters Inc",
  "PixelSoft Solutions",
  "NextGen Technologies",
  "CloudWave Systems",
  "InnoSphere Labs",
  "BlueOrbit IT",
  "CyberNest Pvt Ltd",
  "QuantumX Software",
  "Visionary Works"
];

const Jobcard = ({ job }) => {
  // if companyId is missing → pick random company
  const companyName =
    job.companyId?.companyname ||
    randomCompanies[Math.floor(Math.random() * randomCompanies.length)];

  return (
    <div className="job-card">
      <h3 className="company">{job.title}</h3>
      <p >{companyName}</p>
      <p className="description">{job.description}</p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Salary:</strong> ₹{job.salary}
      </p>
      <p>
        <strong>Experience:</strong> {job.experience} years
      </p>
      <p>
        <strong>Skills:</strong> {job.skills?.join(", ")}
      </p>
      <p>
        <strong>Job Type:</strong> {job.jobtype}
      </p>
    </div>
  );
};

export default Jobcard;
