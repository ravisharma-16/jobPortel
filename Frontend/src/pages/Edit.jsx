import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/auth"; // adjust path if needed
import toast from "react-hot-toast";
import "./Edit.css";

const Edit = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skill: user?.profile?.skill?.join(", ") || "",
    avatar: null,
  });

  // Navigate back
  const backhandle = () => {
    navigate("/profile");
  };

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("fullname", formData.fullname);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("bio", formData.bio);
      data.append("skill", formData.skill);
     if (formData.avatar) {
  data.append("avatar", formData.avatar); // not "file"
}


      // Debug: show 
      // console.log("Form Data Entries:", [...data]);

      const res = await axios.put(
  "http://localhost:8000/api/v1/users/updateprofile",
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  }
);


      if (res.data.success) {
        dispatch(setUser(res.data.data)); // update redux user
        toast.success("Profile updated successfully ✅");
        navigate("/profile"); // redirect to profile page
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <>
      <button onClick={backhandle} className="apply-btn">
        Back
      </button>
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Your Bio"
          />
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
          />
          <input type="file" name="avatar" onChange={handleFileChange} />

          <button type="submit" className="btn-save">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;
