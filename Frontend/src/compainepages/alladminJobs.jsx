import React from "react";
import Navbar from "../component/navbar";
import usegetallobs from "../hooks/usegetalljob";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import "./alladminjobs.css"; // ✅ import CSS

const Alladminjobs = () => {
  usegetallobs();
  const { getalljobs } = useSelector((state) => state.company);

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="table-header">
          <h2>📌 Recent Jobs</h2>
          <button className="btn-add">
            <Link to={"/admin/job/create"}>+ Add Job</Link>
          </button>
        </div>

        {getalljobs && getalljobs.length > 0 ? (
          <Table>
            <TableCaption>A list of jobs created by you.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="col-logo">Logo</TableHead>
                <TableHead className="col-name">Job Title</TableHead>
                <TableHead className="col-date">Date</TableHead>
                <TableHead className="col-action">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {getalljobs.map((job) => (
              <TableRow key={job._id}>
  {/* Logo */}
  <TableCell className="col-logo">
    <Avatar className="avatar">
      <AvatarImage
        src={job.companyId?.logo || "https://via.placeholder.com/50"}
        alt={job.companyId?.companyname || "Company"}
      />
      <AvatarFallback>
        {job.companyId?.companyname ? job.companyId.companyname[0] : "?"}
      </AvatarFallback>
    </Avatar>
  </TableCell>

  {/* Job Title */}
  <TableCell className="col-name">
    <b>{job.title}</b>
    <br />
    <small className="text-muted">
      {job.companyId?.companyname || "Unknown Company"}
    </small>
  </TableCell>

  {/* Date */}
  <TableCell className="col-date">
    <b>{new Date(job.createdAt).toLocaleDateString()}</b>
  </TableCell>

  {/* Actions */}
  <TableCell className="col-action">
    <Link to={`/admin/jobs/${job._id}/applicants`}>
      <button className="btn-view">View Applicant</button>
    </Link>
  </TableCell>
</TableRow>

              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="no-data">No jobs found.</p>
        )}
      </div>
    </>
  );
};

export default Alladminjobs;
