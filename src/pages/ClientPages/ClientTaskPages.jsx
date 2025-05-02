import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientprojectaskapicall} from "../../ApiServices/Cllientapiservices/Client";
import {Link} from "react-router-dom";
import HeaderTab from "../../common/HeaderTab/HeaderTab";
const ClientTaskPages = () => {
  const [IsClientTask, setIsClientTask] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(IsClientTask, "task");
  const fetchclienttaskfunc = async () => {
    try {
      setLoading(true);
      const response = await fetchclientprojectaskapicall({
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: search,
          status: statusFilter,
          priority: priorityFilter,
        },
      });
      if (response.success) {
        setIsClientTask(response.result);
        setTotalTasks(response.totalTasks);
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
      setLoading(false);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to the first page when search changes
  };

  useEffect(() => {
    fetchclienttaskfunc();
  }, [page, rowsPerPage, search, statusFilter, priorityFilter]);

  return (
    <Layout>
      <BreadCrumb pageName="Client Task" />
      <HeaderTab>
        <Box display="flex" gap={2}>
          <FormControl sx={{minWidth: 150}}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{minWidth: 150}}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </HeaderTab>

      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" sx={{padding: 2}}>
          <CircularProgress />
        </Box>
      ) : (
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
                {/* <TableCell>
                <strong>Project ID</strong>
              </TableCell> */}
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
                {/* <TableCell>
                <strong>Milestone ID</strong>
              </TableCell>
              <TableCell>
                <strong>Resource ID</strong>
              </TableCell>
              <TableCell>
                <strong>Company ID</strong>
              </TableCell> */}
                <TableCell>
                  <strong>Created At</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsClientTask?.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{task.ProjectId}</TableCell> */}
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
                      color={
                        task.Status === "COMPLETED" ? "success" : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell>{task.StartDate}</TableCell>
                  <TableCell>{task.EndDate}</TableCell>
                  <TableCell>{task.Estimated_Time} hrs</TableCell>
                  <TableCell>{task.Completed_time} hrs</TableCell>
                  {/* <TableCell>{task.MilestoneId}</TableCell>
                <TableCell>{task.Resource_Id}</TableCell>
                <TableCell>{task.Company_Id}</TableCell> */}
                  <TableCell>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalTasks}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default ClientTaskPages;
