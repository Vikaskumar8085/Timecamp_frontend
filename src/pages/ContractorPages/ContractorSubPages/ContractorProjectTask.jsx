import React, { useEffect, useState } from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { fetchcontractorprojecttasksapicall } from "../../../ApiServices/ContractorApiServices/ContractorApiServices";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ContractorProjectTask = ({ id }) => {
  const [isContractorData, setIsContractorData] = useState([]);
  const fetchcontractorprojecttaskfunc = async () => {
    try {
      const response = await fetchcontractorprojecttasksapicall(id);
      if (response.success) {
        setIsContractorData(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorprojecttaskfunc();
  }, [0]);
  return (
    <>
      <BreadCrumb pageName="Contractor Project Task" />
      <TableContainer
        component={Paper}
        sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell>
                <strong>Task Name</strong>
              </TableCell>
              <TableCell>
                <strong>Milestone ID</strong>
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
                <strong>Resource ID</strong>
              </TableCell>
              <TableCell>
                <strong>Task Description</strong>
              </TableCell>
              <TableCell>
                <strong>Attachment</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isContractorData.flatMap((item) =>
              item?.findTasks?.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.MilestoneId}</TableCell>
                  <TableCell>{task.Priority}</TableCell>
                  <TableCell>{task.Status}</TableCell>
                  <TableCell>{task.StartDate}</TableCell>
                  <TableCell>{task.EndDate}</TableCell>
                  <TableCell>{task.Estimated_Time} hrs</TableCell>
                  <TableCell>{task.Resource_Id}</TableCell>
                  <TableCell>{task.Task_description || "N/A"}</TableCell>
                  <TableCell>
                    {task.Attachment ? (
                      <a
                        href={`path/to/attachments/${task.Attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Attachment
                      </a>
                    ) : (
                      "No Attachment"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ContractorProjectTask;
