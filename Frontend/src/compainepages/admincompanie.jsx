import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import "./admincompany.css"; 
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import axios from "axios";
import {setCompanies} from "../redux/authcompany"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admincompanie = () => {
  const [companies, setCompanie] = useState([]);
  const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();
   const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/v1/company/getComapny",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompanie(res.data.data || []);
        dispatch(setCompanies(res.data.data));
      } catch (err) {
        console.error("⚠️ Failed to fetch companies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="admin-container">
        <div className="table-header">
          <h2>📌 Recent Companies</h2>
          <button className="btn-add">
            <Link to={"/admin/company/create"}>+ Add Company</Link>
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="col-logo">Logo</TableHead>
                <TableHead className="col-name">Company Name</TableHead>
                <TableHead className="col-date">Date</TableHead>
                <TableHead className="col-action">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {companies.map((company) => (
                <TableRow key={company._id}>
                  <TableCell data-label="Logo" className="col-logo">
                    <Avatar className="avatar">
                      <AvatarImage
                        src={company.logo || "https://via.placeholder.com/50"}
                        alt={company.companyname}
                      />
                      <AvatarFallback>{company.companyname[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell data-label="Company Name" className="col-name">
                    <b>{company.companyname}</b>
                  </TableCell>
                  <TableCell data-label="Date" className="col-date">
                    <b>{new Date(company.createdAt).toLocaleDateString()}</b>
                  </TableCell>
                  <TableCell data-label="Action" className="col-action">
                    <Link to={`/admin/companies/${company._id}`}>
                      <button className="btn-view">Edit</button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default Admincompanie;
