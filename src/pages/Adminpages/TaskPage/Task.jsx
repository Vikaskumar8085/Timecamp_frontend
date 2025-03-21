import React, {useEffect, useState} from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Typography,
  TablePagination,
  Chip,
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import AddIcons from "@mui/icons-material/Add";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import TaskCreationForm from "../../../Component/AdminComponents/Task/TaskCreationForm";
import apiInstance from "../../../ApiInstance/apiInstance";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  addTaskapicall,
  fetchProjectwithmilestonesapicall,
} from "../../../ApiServices/TaskApiServices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {Link} from "react-router-dom";

const Task = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [Isprojectmilestonedata, setIsprojectmilestonedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useDispatch();
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
      const response = await apiInstance.get("/v1/admin/fetch-tasks", {
        params: {
          search,
          page: page + 1, // Backend expects 1-based indexing
          limit: rowsPerPage,
        },
      });
      if (response?.data?.success) {
        setTasks(response.data.result);
        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const TaskHandlesubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await addTaskapicall(values);
      if (response.success) {
        setIsOpen(false);
        dispatch(setLoader(false));
        fetchTasks();
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };
  useEffect(() => {
    fetchTasks();
    fetchprojectwithmilestonefunc();
  }, [search, page, rowsPerPage]);

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

        {IsOpen && (
          <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
            <TaskCreationForm
              TaskHandlesubmit={TaskHandlesubmit}
              Isprojectmilestonedata={Isprojectmilestonedata}
            />
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

        <TextField
          label="Search Tasks"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{mb: 2}}
        />
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.ProjectName}</TableCell>
                  <TableCell>{task.MilestoneName}</TableCell>
                  <TableCell>{task.Priority}</TableCell>
                  <TableCell>
                    {new Date(task.StartDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(task.EndDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.ResourceName}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.Status || "Unknown"}
                      color={
                        task.Status === "COMPLETED"
                          ? "success"
                          : task.Status === "INPROGRESS"
                          ? "primary"
                          : task.Status === "P"
                          ? "warning"
                          : "default"
                      }
                    />
                  </TableCell>
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
                  <TableCell>
                    <Link
                      style={{textDecoration: "none", color: "#2c3e50"}}
                      to={`/task-view/${task.task_Id}`}
                    >
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); // Reset to page 0 when changing rows per page
          }}
        />
      </div>
    </Layout>
  );
};

export default Task;
