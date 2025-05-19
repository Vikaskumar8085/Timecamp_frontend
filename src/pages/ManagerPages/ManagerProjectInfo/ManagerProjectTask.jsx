import React, { useState } from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Box, Button, Drawer } from "@mui/material";
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
  Card,
  CardContent,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import TModal from "../../../common/Modal/TModal";

const ManagerTask = ({
  handleaddtask,
  isManagerprojecttask,
  handleSubmitmilestone,
  Ismilestone,
  isMilestonoeresourcesdata,
  IsOpen,
  setIsOpen,
  IsMilestoneOpen,
  setIsMilestoneOpen,
}) => {
  const [IsUploadTask, setIsUploadTask] = useState(false);

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
        <TModal
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          title="Add Task"
        >
          <ManagerProjectTaskForm
            handleaddtask={handleaddtask}
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
          />
        </TModal>
      )}

      {IsMilestoneOpen && (
        <TModal
          open={IsMilestoneOpen}
          onClose={() => setIsMilestoneOpen(false)}
          title="Add Milestone"
        >
          <ManagerProjectMilestoneForm
            handleSubmitmilestone={handleSubmitmilestone}
          />
        </TModal>
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

      <Grid2 container spacing={2}>
        <Grid2 size={{ sm: 12, md: 6 }}>
          <Box sx={{ height: "300px", overflow: "auto" }}>
            {Ismilestone.length > 0 ? (
              Ismilestone.map((item, index) => (
                <Card key={index} sx={{ mb: 1, p: 1, position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                    }}
                  ></Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.Name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.Description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography color="textSecondary">
                No milestones available
              </Typography>
            )}
          </Box>
        </Grid2>
      </Grid2>

      {isManagerprojecttask.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  <b>Task Name</b>
                </TableCell>
                <TableCell>
                  <b>Priority</b>
                </TableCell>
                <TableCell>
                  <b>Start Date</b>
                </TableCell>
                <TableCell>
                  <b>End Date</b>
                </TableCell>
                <TableCell>
                  <b>Task Description</b>
                </TableCell>
                <TableCell>
                  <b> Description</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isManagerprojecttask.map((item) => {
                return item.findTasks.map((task, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.Task_Name}</TableCell>
                      <TableCell>{task.Priority}</TableCell>
                      <TableCell>
                        {new Date(task.StartDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(task.EndDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{task.Task_description}</TableCell>
                      <TableCell>{task.Description}</TableCell>
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
