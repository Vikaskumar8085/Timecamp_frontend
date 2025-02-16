import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const AddProjectTask = () => {
  const formik = useFormik({
    initialValues: {
      taskName: "",
      startDate: "",
      endDate: "",
      estimatedHours: "",
      priority: "",
      description: "",
      attachment: null,
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Task Name is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required("Expected End Date is required"),
      estimatedHours: Yup.number()
        .min(1, "Must be at least 1 hour")
        .required("Estimate Time is required"),
      priority: Yup.string().required("Priority is required"),
      description: Yup.string().required("Task Description is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Values:", values);
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
              <TextField
                fullWidth
                label="Task Name"
                name="taskName"
                value={formik.values.taskName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.taskName && Boolean(formik.errors.taskName)}
                helperText={formik.touched.taskName && formik.errors.taskName}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expected End Date"
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Estimate Time (Hours)"
                name="estimatedHours"
                type="number"
                value={formik.values.estimatedHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.estimatedHours &&
                  Boolean(formik.errors.estimatedHours)
                }
                helperText={
                  formik.touched.estimatedHours && formik.errors.estimatedHours
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Priority Mode"
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.priority && Boolean(formik.errors.priority)}
                helperText={formik.touched.priority && formik.errors.priority}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Description"
                name="description"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">File Attachment</Typography>
              <input
                type="file"
                name="attachment"
                onChange={(event) =>
                  formik.setFieldValue("attachment", event.currentTarget.files[0])
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddProjectTask;
