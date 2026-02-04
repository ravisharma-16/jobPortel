// hooks/useGet.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setallJobs } from "../redux/authcompany";

const usegetallobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAlladminJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/v1/job/getadminjob", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.success) {
          // ✅ FIX: use res.data.data instead of res.data.jobs
          dispatch(setallJobs(res.data.data));
          console.log(res.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchAlladminJobs();
  }, [dispatch]);
};

export default usegetallobs;
