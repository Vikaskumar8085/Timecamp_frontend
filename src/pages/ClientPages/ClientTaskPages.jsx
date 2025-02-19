import React, {useEffect, useState} from "react";
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
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientprojectaskapicall} from "../../ApiServices/Cllientapiservices/Client";

const ClientTaskPages = () => {
  const [IsClientTask, setIsClientTask] = useState([]);
  console.log(IsClientTask, "task");
  const fetchclienttaskfunc = async () => {
    try {
      const response = await fetchclientprojectaskapicall();
      if (response.success) {
        setIsClientTask(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchclienttaskfunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Client Task" />
      <TableContainer
        component={Paper}
        sx={{mt: 3, boxShadow: 3, borderRadius: 2}}
      >
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: "#f5f5f5"}}>
              <TableCell>
                <strong>Task ID</strong>
              </TableCell>
              <TableCell>
                <strong>Project ID</strong>
              </TableCell>
              <TableCell>
                <strong>Task Name</strong>
              </TableCell>
              <TableCell>
                <strong>Task Description</strong>
              </TableCell>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
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
                <strong>Milestone ID</strong>
              </TableCell>
              <TableCell>
                <strong>Resource ID</strong>
              </TableCell>
              <TableCell>
                <strong>Company ID</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsClientTask?.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{task.ProjectId}</TableCell>
                <TableCell>{task.Task_Name}</TableCell>
                <TableCell>{task.Task_description}</TableCell>
                <TableCell>
                  <Chip
                    label={task.Priority}
                    color={task.Priority === "HIGH" ? "error" : "primary"}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.Status}
                    color={task.Status === "COMPLETED" ? "success" : "warning"}
                  />
                </TableCell>
                <TableCell>{task.StartDate}</TableCell>
                <TableCell>{task.EndDate}</TableCell>
                <TableCell>{task.Estimated_Time} hrs</TableCell>
                <TableCell>{task.Completed_time} hrs</TableCell>
                <TableCell>{task.MilestoneId}</TableCell>
                <TableCell>{task.Resource_Id}</TableCell>
                <TableCell>{task.Company_Id}</TableCell>
                <TableCell>
                  {new Date(task.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ClientTaskPages;
