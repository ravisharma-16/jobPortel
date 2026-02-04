import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import "./applicant.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApplicants } from "../redux/Applicanthistory";

const Applicant = () => {
  const { id  } = useParams(); // 👈 must match your route param name
  const [applicants, setApplicantsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id ) {
      console.error("❌ No job id found in URL");
      setLoading(false);
      return;
    }

    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8000/api/v1/application/${id}/applicants`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        console.log("✅ Applicants data:", res.data);

        // adjust according to backend response
        const applicantsData = res.data.job || res.data.applicants || [];
        dispatch(setApplicants(applicantsData));
        setApplicantsState(applicantsData);
      } catch (error) {
        console.error("fetch applicant error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]); // 👈 fix dependency

  const handleAccept = (id) => {
    alert(`✅ Accepted applicant with ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`❌ Rejected applicant with ID: ${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="applicant-container">
        <h2 className="title">Applicants List</h2>

        {loading ? (
          <p>Loading applicants...</p>
        ) : applicants.length === 0 ? (
          <p>No applicants found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="applicant-table">
              <caption>A list of applicants for your jobs.</caption>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Job Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant._id}>
                    <td>{applicant.fullname || "N/A"}</td>
                    <td>{applicant.email || "N/A"}</td>
                    <td>{applicant.contact || "N/A"}</td>
                    <td>{applicant.jobTitle || "N/A"}</td>
                    <td className="action-cell">
                      <button
                        className="btn accept-btn"
                        onClick={() => handleAccept(applicant._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn reject-btn"
                        onClick={() => handleReject(applicant._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Applicant;
