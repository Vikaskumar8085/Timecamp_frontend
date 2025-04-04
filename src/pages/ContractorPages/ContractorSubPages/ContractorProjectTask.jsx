import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CardContent,
  Card,
  Box,
  Grid2,
  TablePagination,
  CircularProgress,
  TextField,
} from "@mui/material";
import apiInstance from "../../../ApiInstance/apiInstance";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ContractorProjectTask = ({id}) => {
  const [isContractorData, setIsContractorData] = useState([]);
  const [iscontractormilestonedata, setiscontractormilestonedata] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // TablePagination uses zero-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");

  // const

  const [isteamdata, setIsteamdata] = useState([]);

  const fetchcontractorprojecttaskfunc = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get(
        `/v2/contractor/contractor-project-task/${id}`,
        {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            search,
          },
        }
      );
      if (response.data?.success) {
        setIsContractorData(response.data.result);
        setTotalRecords(
          response.data.result.reduce(
            (sum, taskData) => sum + taskData.pagination.totalTasks,
            0
          )
        );
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

  // milestone

  const fetchcontractorprojectmilestonesfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/contractor/fetch-contractor-milestone/${id}`
      );
      if (response.data.success) {
        setiscontractormilestonedata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch recent team
  const fetchcontractorrecentprojectTeamfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/contractor/fetch-contractor-team/${id}`
      );
      if (response?.data?.success) {
        setIsteamdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorprojectmilestonesfunc();
    fetchcontractorrecentprojectTeamfunc();
  }, [0]);
  useEffect(() => {
    fetchcontractorprojecttaskfunc();
  }, [page, rowsPerPage, search]);
  return (
    <>
      <BreadCrumb pageName="Contractor Project Task" />
      <Grid2 container spacing={2}>
        <Grid2 size={{sm: 12, md: 6}}>
          <Box sx={{height: "300px", overflow: "auto"}}>
            <Typography variant="h6" gutterBottom>
              Milestone
            </Typography>
            {iscontractormilestonedata.length > 0 ? (
              iscontractormilestonedata.map((item, index) => (
                <Card key={index} sx={{mb: 1, p: 1, position: "relative"}}>
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
        <Grid2 size={{sm: 12, md: 6}}>
          <Grid2 xs={12}>
            <Typography variant="h6" gutterBottom>
              Alloted Task Memeber
            </Typography>
          </Grid2>
          {isteamdata?.map((item, index) => (
            <Grid2 key={index} xs={12} sm={6} md={6}>
              <Paper
                elevation={3}
                sx={{p: 2, display: "flex", alignItems: "center"}}
              >
                <Typography variant="body1" fontWeight="bold">
                  {item}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
      <Paper sx={{p: 2, boxShadow: 3, borderRadius: 2}}>
        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{backgroundColor: "#e0e0e0"}}>
                <TableRow>
                  <TableCell>
                    <strong>Id</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Task Name</strong>
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
                {isContractorData.flatMap((item) =>
                  item?.tasks?.map((task, index) => (
                    <TableRow key={task._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.Task_Name}</TableCell>
                      <TableCell>{task.Priority}</TableCell>
                      <TableCell>{task.Status}</TableCell>
                      <TableCell>{task.StartDate}</TableCell>
                      <TableCell>{task.EndDate}</TableCell>
                      <TableCell>{task.Estimated_Time} hrs</TableCell>
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
                          to={`/contractor/taskinfo/${task.task_Id}`}
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
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </>
  );
};

export default ContractorProjectTask;
