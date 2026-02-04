import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setMessage } from "../redux/auth";
import "../pages/Login.css";
import Navbar from "../component/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, message, isError } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      dispatch(setMessage({ message: "⚠ Please fill in all fields", isError: true }));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setMessage({ message: "", isError: false }));

    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/login", {
        email,
        password,
        role: role.toLowerCase(),
      });

      localStorage.setItem("token", res.data.data.accessToken);

      dispatch(setUser(res.data.data.user));
      dispatch(setMessage({ message: `✅ Welcome back, ${res.data.data.user.fullname}`, isError: false }));

      navigate("/");
    } 
    catch (err) 
    {
      console.error("Login Error:", err.response?.data || err.message);
      dispatch(setMessage({ message: "❌ Invalid credentials", isError: true }));
    } finally 
    {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1>
            Welcome to <span className="papers">Job Portal</span>
          </h1>
          <h1>Login</h1>

          {message && (
            <p className={isError ? "error-message" : "success-message"}>
              {message}
            </p>
          )}

          <label>✉ Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <label>🔑 Password</label>
          <input
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          

          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading} className={isLoading ? "loading-btn" : ""}>
            {isLoading ? "Loading..." : "Login"}
          </button>

          <div className="noaccount">
            <p>
              No account?{" "}
              <Link to="/register" className="papers">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
