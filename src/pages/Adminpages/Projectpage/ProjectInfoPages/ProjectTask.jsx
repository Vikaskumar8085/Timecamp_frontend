import {Box, Button, Drawer, Grid2} from "@mui/material";
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
import React, {useState} from "react";
import MilestoneForm from "./MilestoneForm";
import apiInstance from "../../../../ApiInstance/apiInstance";
import UploadTask from "../../../../Component/AdminComponents/Task/UploadTask";
import AddProjectTask from "../../../../Component/AdminComponents/Project/AddProjectTask";
import MilestoneList from "../../../../Component/AdminComponents/Project/ProjecTaskComponent/MilestoneList";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../../redux/LoaderSlices/LoaderSlices";

const ProjectTask = ({id}) => {
  const [IsTaskOpen, setIsTaskOpen] = useState(false);
  const [IsMilestoneOpen, setIsMieStoneOpen] = useState(false);
  const [IsUploadTaskOpen, setIsUploadTaskOpen] = useState(false);
  const [Ismilestonedata, setIsmilestonedata] = useState([]);
  const [isMilestonoeresourcesdata, setIsMilestonoeresourcesdata] = useState(
    []
  );
  let dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await apiInstance.get(
        `/v1/admin/fetch-project-task/${id}`
      );
      setTasks(response.data.result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const fetchmilestonewithresourcesfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/milestone/fetch-milestone-resources/${id}`
      );
      if (response.data.success) {
        setIsMilestonoeresourcesdata(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchmilestonefunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/milestone/fetch-milestone/${id}`
      );
      if (response.data.success) {
        setIsmilestonedata(response.data.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await apiInstance.post(
        `/v2/milestone/create-milestone/${id}`,
        values.milestones
      );
      console.log(response);
      if (response.data.success) {
        console.log(response);
        fetchmilestonefunc();
        setIsMieStoneOpen(false);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const TaskHandleSubmit = async (value) => {
    try {
      const response = await apiInstance.post(
        `/v1/admin/create-task/${id}`,
        value
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
        setIsTaskOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const uploadTaskhandlesubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.post(
        `/v1/csv-upload/task-csv-upload/${id}`,
        value
      );
      dispatch(setLoader(false));

      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
        toast.success(response.data.message);
        setIsUploadTaskOpen(false);
        dispatch(setLoader(false));
      } else {
        toast.error(response.data.message);
        toast.success(response.data.message);
        setIsUploadTaskOpen(false);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      setIsUploadTaskOpen(false);
    }
  };
  React.useEffect(() => {
    fetchmilestonefunc();
    fetchmilestonewithresourcesfunc();
    fetchTasks();
  }, [0]);
  return (
    <>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsTaskOpen(true)}
      >
        Add Task
      </Button>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsMieStoneOpen(true)}
      >
        Add MileStone
      </Button>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsUploadTaskOpen(true)}
      >
        Upload Task
      </Button>

      {IsTaskOpen && (
        <Drawer
          open={IsTaskOpen}
          onClose={() => setIsTaskOpen(false)}
          anchor="right"
        >
          <AddProjectTask
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
            TaskHandleSubmit={TaskHandleSubmit}
          />
        </Drawer>
      )}

      {IsMilestoneOpen && (
        <Drawer
          open={IsMilestoneOpen}
          onClose={() => setIsMieStoneOpen(false)}
          anchor="right"
        >
          <MilestoneForm handleSubmit={handleSubmit} />
        </Drawer>
      )}

      {IsUploadTaskOpen && (
        <Drawer
          open={IsUploadTaskOpen}
          onClose={() => setIsUploadTaskOpen(false)}
          anchor="right"
        >
          <UploadTask uploadTaskhandlesubmit={uploadTaskhandlesubmit} />
        </Drawer>
      )}

      <div>
        <Grid2 container spacing={2}>
          <Grid2 size={{sm: 12, md: 6}}>
            <Box sx={{height: "300px", overflow: "auto"}}>
              <MilestoneList milestones={Ismilestonedata} />
            </Box>
          </Grid2>
        </Grid2>

        <TableContainer component={Paper} sx={{mt: 3}}>
          <Typography variant="h6" sx={{p: 2}}>
            Task List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Resource Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ProjectTask;
