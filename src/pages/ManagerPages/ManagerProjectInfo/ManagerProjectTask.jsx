import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import ManagerProjectMilestoneForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectMilestoneForm";
import ManagerProjectTaskForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectTaskForm";
import ManagerProjectTaskUploadForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectTaskUploadForm";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const ManagerTask = ({
  handleaddtask,
  isManagerprojecttask,
  handleSubmitmilestone,
  isMilestonoeresourcesdata,
}) => {
  const [IsMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [IsUploadTask, setIsUploadTask] = useState(false);

  console.log(isMilestonoeresourcesdata, "isMilestonoeresourcesdata");
  return (
    <>
      <BreadCrumb pageName="Manager Task" />

      <div>
        <Button
          onClick={() => setIsMilestoneOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Create Milestone
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Create Task
        </Button>
        {/* <Button
          onClick={() => setIsUploadTask(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Upload Task
        </Button> */}
      </div>

      {IsOpen && (
        <Drawer
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          anchor="right"
        >
          <ManagerProjectTaskForm
            handleaddtask={handleaddtask}
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
          />
        </Drawer>
      )}

      {IsMilestoneOpen && (
        <Drawer
          open={IsMilestoneOpen}
          onClose={() => setIsMilestoneOpen(false)}
          anchor="right"
        >
          <ManagerProjectMilestoneForm
            handleSubmitmilestone={handleSubmitmilestone}
          />
        </Drawer>
      )}

      {IsUploadTask && (
        <Drawer
          open={IsUploadTask}
          onClose={() => {
            setIsUploadTask(false);
          }}
          anchor="right"
        >
          <ManagerProjectTaskUploadForm />
        </Drawer>
      )}

      {isManagerprojecttask.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>TasK Name</b>
                </TableCell>
                <TableCell>
                  <b>Hours</b>
                </TableCell>
                <TableCell>
                  <b>Task Description</b>
                </TableCell>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell>
                  <b>Approval Status</b>
                </TableCell>
                <TableCell>
                  <b>Billing Status</b>
                </TableCell>
                <TableCell>
                  <b>Start Time</b>
                </TableCell>
                <TableCell>
                  <b>End Time</b>
                </TableCell>
                <TableCell>
                  <b>Approved By</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isManagerprojecttask.map((item) => {
                return item.findTasks.map((entry, index) => {
                  console.log("lkasdflksf", entry);
                  return (
                    <TableRow>
                      <TableCell>{entry.Task_Name || "N/A"}</TableCell>
                      <TableCell>{entry.hours || "N/A"}</TableCell>
                      <TableCell>{entry.task_description || "N/A"}</TableCell>
                      <TableCell>{entry.Description || "N/A"}</TableCell>
                      <TableCell>{entry.approval_status || "N/A"}</TableCell>
                      <TableCell>{entry.billing_status || "N/A"}</TableCell>
                      <TableCell>{entry.start_time || "N/A"}</TableCell>
                      <TableCell>{entry.end_time || "N/A"}</TableCell>
                      <TableCell>{entry.approved_by || "N/A"}</TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center">No timesheet data found.</Typography>
      )}
    </>
  );
};

export default ManagerTask;
