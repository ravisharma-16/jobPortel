import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "../pages/appliedjob.css"

const Appliedjob = () => {
  const appliedJobs = [
    {
      id: 1,
      date: "2025-09-01",
      title: "Frontend Developer",
      company: "Google",
      status: "Pending",
    },
    {
      id: 2,
      date: "2025-08-28",
      title: "Backend Developer",
      company: "Microsoft",
      status: "Selected",
    },
    {
      id: 3,
      date: "2025-08-25",
      title: "UI/UX Designer",
      company: "Flipkart",
      status: "Rejected",
    },
  ];

  return (
    <Table>
      <TableCaption>📌 Recent Applied Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>
                <span
                  className={`status-badge ${
                    job.status === "Selected"
                      ? "selected"
                      : job.status === "Rejected"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {job.status}
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              ❌ No jobs applied yet
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Appliedjob;
