import React from "react";
import Navbar from "../component/navbar";
import { jobData } from "../pages/jobData";
import Job from "../pages/Job";
import "../pages/Broweser.css"

const Browes = () => {
  return (
    <div>
      <Navbar />
      <div className="search">
      <h1>Search Results {jobData.length}</h1>
      </div>

       <div className="cards">
        {jobData.map((job) => (
        <Job key={job.id} job={job} />
      ))}
       </div>
    </div>
  );
};

export default Browes;
