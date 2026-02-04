// hooks/useGet.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setsinglejob } from "../redux/job.redux";

const useSingledata = (objid) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchsingleJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:8000/api/v1/job/get/${objid}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.success) {
          // ✅ FIX: use res.data.data instead of res.data.jobs
          dispatch(setsinglejob(res.data.data));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchsingleJobs();
  }, [dispatch]);
};

export default useSingledata;
