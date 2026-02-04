import React from "react";
import Navbar from "../component/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector, useDispatch} from "react-redux";
import "./profile.css";
import Appliedjob from "./Appliedjob";
import { Link } from "react-router-dom";
import { logout, setMessage } from "../redux/auth";
import { useNavigate } from "react-router-dom";
// const skills = ["React","javaScript","HTML","CSS","C++","C","MongooDB","Tailwind CSS","express.js","Node.js","DSA","Oops"];


const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const isresume = true;
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
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <Avatar className="profile-avatar">
            <AvatarImage
              className="avatar-img"
              src={user?.profile?.profilephoto || "question_mark.jpg"} 
              alt="Profile"
            />
            <AvatarFallback>
              {user?.fullname ? user.fullname.charAt(0) : "U"}
            </AvatarFallback>
          </Avatar>

          <h2 className="profile-name">{user?.fullname || "Guest User"}</h2>
          <p className="profile-email">{user?.email || "No Email Provided"}</p>
          <p className="profile-email">{user?.phoneNumber}</p>
          <span className="profile-role">{user?.role || "N/A"}</span>

          <p className="profile-bio">
           {user?.profile.bio } 
          </p>

          <div>
            <h2>Skills</h2>
          {user?.profile?.skill?.length !== 0 ? (
  user?.profile?.skill.map((item, index) => (
    <button key={index}>{item}</button>
  ))
) : (
  <span>N/A</span>
)}

<div>
  <label >Resume</label>
  {
    isresume ? (<button> <a href="http://resume.com" target="_blank" download="resume.pdf">Download Resume</a></button>) : (<p>No Resume Found</p>)
  }
</div>

<div>
  <Appliedjob />
</div>

          </div>

          <div className="profile-actions">
            <button className="btn"><Link to={"/Edit"}>Edit Profile</Link></button>
            <button onClick={handleLogout} className="btn logout">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
