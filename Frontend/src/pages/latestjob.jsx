import React from "react";
import Jobcard from "./Jobcard";
import "../pages/latestJob.css";
import { useSelector } from "react-redux";

const Latestjob = () => {
  // get jobs from redux store
  const allJobs = useSelector((state) => state.job.allJobs);

  return (
    <div>
      <h2>
        <span className="latest">Latest & Top</span> Job openings
      </h2>
      <div className="box">
        {allJobs && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job, index) => (
            <Jobcard key={job._id || index} job={job} />
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Latestjob;
