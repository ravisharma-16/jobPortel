// hooks/useGet.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/job.redux";

const useGetJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/v1/job/get", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.success) {
          // ✅ FIX: use res.data.data instead of res.data.jobs
          dispatch(setAllJobs(res.data.data));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
};

export default useGetJobs;
