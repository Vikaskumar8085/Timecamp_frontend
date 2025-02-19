import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
const ClientProjectTask = ({isclinettaskinfodata}) => {
  const formatDate = (excelDate) => {
    if (!excelDate) return "N/A";
    return new Date(
      (parseFloat(excelDate) - 25569) * 86400000
    ).toLocaleDateString();
  };

  return (
    <div>
      <BreadCrumb pageName="Client Project Task" />
      <TableContainer
        component={Paper}
        sx={{mt: 3, boxShadow: 3, borderRadius: 2}}
      >
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: "#f5f5f5"}}>
              <TableCell>
                <strong>Task Name</strong>
              </TableCell>
              <TableCell>
                <strong>Project ID</strong>
              </TableCell>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell>
                <strong>Start Date</strong>
              </TableCell>
              <TableCell>
                <strong>End Date</strong>
              </TableCell>
              <TableCell>
                <strong>Estimated Time</strong>
              </TableCell>
              <TableCell>
                <strong>Completed Time</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isclinettaskinfodata?.map((item) =>
              item?.fetchtasks?.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.ProjectId}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.Priority}
                      color={task.Priority === "HIGH" ? "error" : "primary"}
                    />
                  </TableCell>
                  <TableCell>{formatDate(task.StartDate)}</TableCell>
                  <TableCell>{formatDate(task.EndDate)}</TableCell>
                  <TableCell>{task.Estimated_Time} hrs</TableCell>
                  <TableCell>{task.Completed_time} hrs</TableCell>
                  <TableCell>
                    <Chip
                      label={task.Status}
                      color={
                        task.Status === "COMPLETED" ? "success" : "warning"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientProjectTask;
