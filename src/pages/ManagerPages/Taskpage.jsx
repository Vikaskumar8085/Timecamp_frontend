import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Drawer,
} from "@mui/material";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";

const Taskpage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [Isprojectmilestonedata, setIsprojectmilestonedata] = useState([]);

  const fetchmanagertaskmilestonesfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-projectwithmilestone"
      );
      if (response?.data?.success) {
        setIsprojectmilestonedata(response.data.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      ProjectId: "",
      MilestoneId: "",
      Task_Name: "",
      StartDate: "",
      EndDate: "",
      Estimated_Time: "",
      Priority: "",
      Task_Description: "",
      Attachment: null,
      Resource_Id: "",
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("MilestoneId", values.MilestoneId);
      formData.append("Task_Name", values.Task_Name);
      formData.append("StartDate", values.StartDate);
      formData.append("ProjectId", values.ProjectId);
      formData.append("EndDate", values.EndDate);
      formData.append("Estimated_Time", values.Estimated_Time);
      formData.append("Priority", values.Priority);
      formData.append("Task_Description", values.Task_Description);
      formData.append("file", values.Attachment);
      formData.append("Resource_Id", values.Resource_Id);

      try {
        dispatch(setLoader(true));
        const response = await apiInstance.post(
          "/v2/manager/create-manager-task",
          formData
        );
        if (response?.data?.success) {
          setIsOpen(false);
          dispatch(setLoader(false));
          toast.success(response?.data?.message);
          formik.resetForm();
          fetchTasks();
        } else {
          dispatch(setLoader(false));
          setIsOpen(false);
          toast.error(response?.data?.message);
          formik.resetForm();
        }
      } catch (error) {
        setIsOpen(false);
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const fetchTasks = async () => {
    try {
      const response = await apiInstance.get("/v2/manager/fetch-manager-task");
      setTasks(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmanagertaskmilestonesfunc();
    fetchTasks();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName=" Manager Task" />
      <Button
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
      >
        Create Task
      </Button>

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <Container maxWidth="md">
            <Box sx={{p: 2}}>
              <Typography variant="h5" gutterBottom>
                Add Task
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select Project</InputLabel>
                      <Select
                        {...formik.getFieldProps("ProjectId")}
                        value={formik.values.ProjectId}
                        onChange={formik.handleChange}
                      >
                        {Isprojectmilestonedata.map((item) => (
                          <MenuItem key={item.ProjectId} value={item.ProjectId}>
                            {item.Project_Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select Milestone</InputLabel>
                      <Select
                        {...formik.getFieldProps("MilestoneId")}
                        value={formik.values.MilestoneId}
                        onChange={formik.handleChange}
                      >
                        {Isprojectmilestonedata.filter(
                          (item) => item.ProjectId === formik.values.ProjectId
                        ) // Filter by selected ProjectId
                          .map((item) => {
                            return item.mileStonedata?.map((milestoneItem) => (
                              <MenuItem
                                key={milestoneItem.milestoneId}
                                value={milestoneItem.milestoneId}
                              >
                                {milestoneItem.milestoneName}
                              </MenuItem>
                            ));
                          })}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select Resource</InputLabel>
                      <Select
                        {...formik.getFieldProps("Resource_Id")}
                        value={formik.values.Resource_Id}
                        onChange={formik.handleChange}
                      >
                        {Isprojectmilestonedata.filter(
                          (item) => item.ProjectId === formik.values.ProjectId
                        ) // Filter by selected ProjectId
                          .map((item) => {
                            return item.resourcedata?.map((resourcedata) => (
                              <MenuItem
                                key={resourcedata.resourceId}
                                value={resourcedata.resourceId}
                              >
                                {resourcedata.resourceName}
                              </MenuItem>
                            ));
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Task Name"
                      name="Task_Name"
                      value={formik.values.Task_Name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.Task_Name &&
                        Boolean(formik.errors.Task_Name)
                      }
                      helperText={
                        formik.touched.Task_Name && formik.errors.Task_Name
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      name="StartDate"
                      type="date"
                      InputLabelProps={{shrink: true}}
                      value={formik.values.StartDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.StartDate &&
                        Boolean(formik.errors.StartDate)
                      }
                      helperText={
                        formik.touched.StartDate && formik.errors.StartDate
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expected End Date"
                      name="EndDate"
                      type="date"
                      InputLabelProps={{shrink: true}}
                      value={formik.values.EndDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.EndDate && Boolean(formik.errors.EndDate)
                      }
                      helperText={
                        formik.touched.EndDate && formik.errors.EndDate
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Estimate Time (Hours)"
                      name="Estimated_Time"
                      type="number"
                      value={formik.values.Estimated_Time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.Estimated_Time &&
                        Boolean(formik.errors.Estimated_Time)
                      }
                      helperText={
                        formik.touched.Estimated_Time &&
                        formik.errors.Estimated_Time
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Priority Mode"
                      name="Priority"
                      value={formik.values.Priority}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.Priority &&
                        Boolean(formik.errors.Priority)
                      }
                      helperText={
                        formik.touched.Priority && formik.errors.Priority
                      }
                    >
                      <MenuItem value="HIGH">High</MenuItem>
                      <MenuItem value="MEDIUM">Medium</MenuItem>
                      <MenuItem value="LOW">Low</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Task Description"
                      name="Task_Description"
                      multiline
                      rows={3}
                      value={formik.values.Task_Description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.Task_Description &&
                        Boolean(formik.errors.Task_Description)
                      }
                      helperText={
                        formik.touched.Task_Description &&
                        formik.errors.Task_Description
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1">File Attachment</Typography>
                    <input
                      type="file"
                      name="Attachment"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "Attachment",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <FormControl fullWidth>
                  <InputLabel>Select Resources</InputLabel>
                  <Select
                    {...formik.getFieldProps("Resource_Id")}
                    value={formik.values.Resource_Id}
                    onChange={formik.handleChange}
                  >
                    {resources.length > 0 ? (
                      resources.map((resource) => (
                        <MenuItem
                          key={resource.staff_id}
                          value={resource.staff_id}
                        >
                          {resource.FirstName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No resources available</MenuItem>
                    )}
                  </Select>
                </FormControl> */}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      sx={{
                        background: "#2c3e50",
                        padding: "8px 10px",
                        color: "white",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Submit Task
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Drawer>
      )}

      <TableContainer component={Paper} sx={{mt: 4, p: 2}}>
        <Typography variant="h5" gutterBottom>
          Manager Tasks
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
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
              {tasks.map((task, index) => (
                <TableRow key={task.tast_Id}>
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
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Layout>
  );
};

export default Taskpage;
