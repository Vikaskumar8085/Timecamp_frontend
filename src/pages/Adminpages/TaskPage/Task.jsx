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
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import AddIcons from "@mui/icons-material/Add";
import Layout from "../../../Layoutcomponents/Layout/Layout";
// import UploadTask from "../../../Component/AdminComponents/Task/UploadTask";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import TaskCreationForm from "../../../Component/AdminComponents/Task/TaskCreationForm";
import apiInstance from "../../../ApiInstance/apiInstance";
import {fetchProjectwithmilestonesapicall} from "../../../ApiServices/TaskApiServices";

const Task = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [Isprojectmilestonedata, setIsprojectmilestonedata] = useState([]);
  const fetchprojectwithmilestonefunc = async () => {
    try {
      const response = await fetchProjectwithmilestonesapicall();
      if (response.success) {
        setIsprojectmilestonedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await apiInstance.get("/v1/admin/fetch-tasks"); // Update with your API endpoint
      setTasks(response.data.result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
    fetchprojectwithmilestonefunc();
  }, []);

  return (
    <Layout>
      <div>
        <BreadCrumb pageName="Task" />
        <Button
          onClick={() => setIsOpen(true)}
          startIcon={<AddIcons />}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Add Task
        </Button>
        {/* <Button
          onClick={() => setIsUpload(true)}
          startIcon={<FileUploadIcon />}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Upload Task
        </Button> */}

        {IsOpen && (
          <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
            <TaskCreationForm Isprojectmilestonedata={Isprojectmilestonedata} />
          </Drawer>
        )}

        {/* {IsUpload && (
          <Drawer
            open={IsUpload}
            onClose={() => setIsUpload(false)}
            anchor="right"
          >
            <UploadTask />
          </Drawer>
        )} */}
        <TableContainer component={Paper} sx={{mt: 3}}>
          <Typography variant="h6" sx={{p: 2}}>
            Task List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Resource Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Attachment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.ProjectName?.join(", ")}</TableCell>
                  <TableCell>{task.MilestoneName?.join(", ")}</TableCell>
                  <TableCell>{task.Priority}</TableCell>
                  <TableCell>
                    {new Date(task.StartDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(task.EndDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.ResourceName?.join(", ")}</TableCell>
                  <TableCell>{task.Status}</TableCell>
                  <TableCell>
                    {task.Attachment && (
                      <img
                        src={`/uploads/${task.Attachment}`}
                        alt="Task Attachment"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default Task;
