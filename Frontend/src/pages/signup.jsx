import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import "./Register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState(""); 
  const [isError, setIsError] = useState(false); 

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role || !phone) {
      setMessage("⚠ Please fill in all fields");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8000/api/v1/users/register", {
        fullname: name,
        email,
        password,
        phoneNumber: phone,
        role,
      });

      setMessage("✅ Registration successful! Redirecting to login...");
      navigate("/login")
      setIsError(false);
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      setMessage(
        "❌ Registration failed: " +
          (error.response?.data?.message || "Try again")
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="register-form" onSubmit={handleRegister}>
        <h1>Register</h1>

        {/* ✅ Feedback message */}
        {message && (
          <p className={isError ? "error-message" : "success-message"}>
            {message}
          </p>
        )}

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>

        {/* Submit */}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading.." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
