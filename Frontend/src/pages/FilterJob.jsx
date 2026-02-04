import React, { useState } from "react";
import Navbar from "../component/navbar";
import Job from "../pages/Job";
import "../pages/filter.css";
import useGetJobs from "../hooks/useGet";
import { useSelector } from "react-redux";

const FilterJob = () => {
  useGetJobs(); // just triggers fetching into redux
  const { allJobs } = useSelector((state) => state.job); // get jobs from redux

  const [filters, setFilters] = useState({
    location: "",
    position: "",
    jobtype: "",
  });

  // 🔎 Filtering logic
  const filteredJobs = (allJobs || []).filter((job) => {
    return (
      (filters.location === "" ||
        job.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.position === "" || job.position === filters.position) &&
      (filters.jobtype === "" || job.jobtype === filters.jobtype)
    );
  });

  return (
    <>
      <Navbar />
      <div>
        {/* 🔹 Filter Section */}
        <div className="filter-box">
          <h2>Filter Jobs</h2>

          {/* Location Filter */}
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
          </select>

          {/* Position Filter */}
          <select
            value={filters.position}
            onChange={(e) => setFilters({ ...filters, position: e.target.value })}
          >
            <option value="">All Positions</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          {/* Job Type Filter */}
          <select
            value={filters.jobtype}
            onChange={(e) =>
              setFilters({ ...filters, jobtype: e.target.value })
            }
          >
            <option value="">All Job Types</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* 🔹 Job Listing */}
        <div className="job-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="no-jobs">❌ No jobs found for selected filters.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterJob;
