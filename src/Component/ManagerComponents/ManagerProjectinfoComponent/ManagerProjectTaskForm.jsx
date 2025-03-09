import React from "react";
import { useFormik } from "formik";
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
} from "@mui/material";

const ManagerProjectTaskForm = ({
  isMilestonoeresourcesdata,
  handleaddtask,
}) => {
  const resources = isMilestonoeresourcesdata[0]?.Resourcedata || [];

  const formik = useFormik({
    initialValues: {
      MilestoneId: "",
      Task_Name: "",
      StartDate: "",
      EndDate: "",
      Estimated_Time: "",
      Priority: "",
      Task_Description: "",
      Attachment: null,
      Resource_Id: "", // new field for selected resources
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values, ">>>>>>>>.. .............values");
      formData.append("MilestoneId", values.MilestoneId);
      formData.append("Task_Name", values.Task_Name);
      formData.append("StartDate", values.StartDate);
      formData.append("EndDate", values.EndDate);
      formData.append("Estimated_Time", values.Estimated_Time);
      formData.append("Priority", values.Priority);
      formData.append("Task_Description", values.Task_Description);
      formData.append("file", values.Attachment);
      formData.append("Resource_Id", values.Resource_Id);
      handleaddtask(formData);

      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Task
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Milestone</InputLabel>
                <Select
                  {...formik.getFieldProps("MilestoneId")}
                  value={formik.values.MilestoneId}
                  onChange={formik.handleChange}
                >
                  {isMilestonoeresourcesdata.map((item) => (
                    <MenuItem key={item.Milestone_id} value={item.Milestone_id}>
                      {item.Name}
                    </MenuItem>
                  ))}
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
                  formik.touched.Task_Name && Boolean(formik.errors.Task_Name)
                }
                helperText={formik.touched.Task_Name && formik.errors.Task_Name}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="StartDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.StartDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.StartDate && Boolean(formik.errors.StartDate)
                }
                helperText={formik.touched.StartDate && formik.errors.StartDate}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expected End Date"
                name="EndDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.EndDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.EndDate && Boolean(formik.errors.EndDate)}
                helperText={formik.touched.EndDate && formik.errors.EndDate}
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
                  formik.touched.Estimated_Time && formik.errors.Estimated_Time
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
                  formik.touched.Priority && Boolean(formik.errors.Priority)
                }
                helperText={formik.touched.Priority && formik.errors.Priority}
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
              <FormControl fullWidth>
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
              </FormControl>
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
  );
};

export default ManagerProjectTaskForm;
