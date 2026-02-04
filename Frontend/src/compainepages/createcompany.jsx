import React, { useState } from "react";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMessage } from "../redux/auth";
import { setsinglecompany } from "../redux/authcompany";
import axios from "axios"; // ✅ import axios
import "./createcompany.css";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, message, isError } = useSelector((state) => state.auth);

  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/v1/company/registerCompany",
        {
          companyname: companyName,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        dispatch(setsinglecompany(data.data)); 
        const companyId = data?.data?._id;
        dispatch(
          setMessage({
            message: "✅ Company Registered Successfully",
            isError: false,
          })
        );
        navigate(`/admin/companies/${companyId}`);
      } else {
        dispatch(setMessage({ message: `❌ ${data.message}`, isError: true }));
      }
    } catch (error) {
      dispatch(
        setMessage({
          message:
            error.response?.data?.message || "⚠️ Error registering company",
          isError: true,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Register New Company</h2>

        {message && (
          <div className={`message-box ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="company-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter company name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter company description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading}
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/admin/companies")}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCompany;
