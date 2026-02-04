import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout, setMessage } from "../redux/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear redux + localStorage
    dispatch(logout());
    navigate("/");
    dispatch(
      setMessage({
        message: `✅ Logout Successfully, ${user?.fullname || ""}`,
        isError: false,
      })
    );
  };

  return (
    <div className="big-container">
      {/* Logo */}
      <div>
        <h1>
          Job <span className="portal">Portal</span>
        </h1>
      </div>

      {/* Navbar Links */}
      <div className="navbar">
        {/* <ul className="nav-links">
          {user && user.role === 'Recruiter' ? (
            <>
             <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/Companies">Companies</Link></li>
          <li><Link to="/admin/jobs">Jobs</Link></li>
          </>
          ) : (
            <>
             <li><Link to="/">Home</Link></li>
          <li><Link to="/Browser">Browser</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          </>
          ) }
        </ul> */}

        {/* If not logged in → show login/register */}
        {!user ? (
          <div className="login_button">
            <Link to="/login">
              <Button className="apply-btn" variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="apply-btn">Register</Button>
            </Link>
          </div>
        ) : (
          <>
          <div>
            <ul className="nav-links">
          {user && user.role === 'Recruiter' ? (
            <>
             <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/Companies">Companies</Link></li>
          <li><Link to="/admin/jobs">Jobs</Link></li>
          </>
          ) : (
            <>
             <li><Link to="/">Home</Link></li>
          <li><Link to="/Browser">Browser</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          </>
          ) }
        </ul>
          </div>
          <div className="avatar">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={user?.avatar || user?.profile?.profilephoto || "question_mark.jpg"} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    border: "2px solid grey",
                    height: "100px",
                    width: "380px",
                    padding: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Avatar className="popover-avatar">
                    <AvatarImage src={user?.avatar || user?.profile?.profilephoto || "question_mark.jpg"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="message">
                    <span className="user-info">{user.fullname}</span>
                    <p>Welcome back 👋 You are logged in!</p>
                    <div className="prof" style={{ display: "flex", gap: "10px" }}>
                      {user && user.role === 'Student' &&(
                         <Button variant="outline">
                        <Link to={"/profile"}>Profile</Link>
                      </Button>
                      )}
                      <Button onClick={handleLogout} variant="outline">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
