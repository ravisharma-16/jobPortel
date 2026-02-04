import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar";
import "./singleCompany.css";

const SingleCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState({
    companyname: "",
    description: "",
    website: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8000/api/v1/company/getComapanybyuser/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompanyData(res.data.data);
      } catch (err) {
        setMessage("⚠️ Failed to load company data");
      }
    };
    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:8000/api/v1/company/updateCompany/${id}`,
        companyData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage("✅ Company updated successfully!");
        navigate("/admin/companies");
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "⚠️ Error updating company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="company-container">
        <h2>Edit Company</h2>

        {message && (
          <div className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="company-form">
          <label>
            Company Name
            <input
              type="text"
              name="companyname"
              value={companyData.companyname}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleChange}
              required
              disabled={loading}
            ></textarea>
          </label>

          <label>
            Website
            <input
              type="text"
              name="website"
              value={companyData.website}
              onChange={handleChange}
              disabled={loading}
            />
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              value={companyData.location}
              onChange={handleChange}
              disabled={loading}
            />
          </label>

          <div className="form-actions">
            <button type="button" onClick={() => navigate("/admin/companies")} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleCompany;
