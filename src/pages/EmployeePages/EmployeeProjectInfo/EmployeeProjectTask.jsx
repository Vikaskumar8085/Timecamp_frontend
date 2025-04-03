import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchemployeeprojecttaskapicall} from "../../../ApiServices/EmployeeApiservices/Employee";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Link} from "react-router-dom";
const EmployeeProjectTask = ({id}) => {
  const [IsEmployeeProjectTaskdata, setIsEmployeeProjectTaskdata] = useState(
    []
  );

  const fetchEmployeeProjectTaskFunc = async () => {
    try {
      const response = await fetchemployeeprojecttaskapicall(id);
      if (response.success) {
        setIsEmployeeProjectTaskdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchEmployeeProjectTaskFunc();
  }, [0]);
  return (
    <div>
      <>
        <BreadCrumb pageName="Employee Task" />
        <TableContainer
          component={Paper}
          sx={{mt: 2, boxShadow: 3, borderRadius: 2}}
        >
          <Table>
            <TableHead sx={{backgroundColor: "#e0e0e0"}}>
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
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsEmployeeProjectTaskdata.flatMap((item) =>
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
                    <TableCell>
                      <Link
                        style={{textDecoration: "none", color: "#2c3e50"}}
                        to={`/employee/taskinfo/${task.task_Id}`}
                      >
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </div>
  );
};

export default EmployeeProjectTask;
