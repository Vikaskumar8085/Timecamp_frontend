import React, {useState, useEffect} from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Container,
  Typography,
  Box,
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
// import {DesktopDatePicker} from "@mui/x-date-pickers";

const TaskCreationForm = () => {
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch projects, milestones, and resources from API
    setProjects([
      {id: "1", name: "Project A"},
      {id: "2", name: "Project B"},
    ]);
    setResources([
      {id: "101", name: "Resource 1"},
      {id: "102", name: "Resource 2"},
    ]);
  }, []);

  const formik = useFormik({
    initialValues: {
      projectId: "",
      milestoneId: "",
      taskName: "",
      resourceIds: [],
      startDate: null,
      expectedDate: null,
      priority: "",
      estimatedTime: "",
      taskDescription: "",
      attachment: null,
    },
    validationSchema: Yup.object({
      projectId: Yup.string().required("Project is required"),
      milestoneId: Yup.string().required("Milestone is required"),
      taskName: Yup.string().required("Task Name is required"),
      resourceIds: Yup.array().min(1, "Select at least one resource"),
      startDate: Yup.date().required("Start date is required"),
      expectedDate: Yup.date().required("Expected date is required"),
      priority: Yup.string().required("Priority is required"),
      estimatedTime: Yup.number().min(1, "Must be at least 1 hour"),
      taskDescription: Yup.string(),
      attachment: Yup.mixed().nullable(),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{mt: 4, p: 3, borderRadius: 2}}>
        <Typography variant="h5" gutterBottom>
          Upload Project
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{display: "flex", flexDirection: "column", gap: "16px"}}
        >
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select {...formik.getFieldProps("projectId")}>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Milestone</InputLabel>
            <Select {...formik.getFieldProps("milestoneId")}>
              {milestones.map((milestone) => (
                <MenuItem key={milestone.id} value={milestone.id}>
                  {milestone.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Task Name"
            {...formik.getFieldProps("taskName")}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Resource</InputLabel>
            <Select
              multiple
              value={formik.values.resourceIds}
              onChange={(e) =>
                formik.setFieldValue("resourceIds", e.target.value)
              }
              input={<OutlinedInput label="Resource" />}
              renderValue={(selected) => (
                <div style={{display: "flex", flexWrap: "wrap", gap: 5}}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={resources.find((r) => r.id === value)?.name}
                    />
                  ))}
                </div>
              )}
            >
              {resources.map((resource) => (
                <MenuItem key={resource.id} value={resource.id}>
                  {resource.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <DesktopDatePicker
        label="Start Date"
        value={formik.values.startDate}
        onChange={(date) => formik.setFieldValue("startDate", date)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      /> */}

          {/* <DesktopDatePicker
        label="Expected Date"
        value={formik.values.expectedDate}
        onChange={(date) => formik.setFieldValue("expectedDate", date)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      /> */}

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select {...formik.getFieldProps("priority")}>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Estimated Time (Hours)"
            type="number"
            {...formik.getFieldProps("estimatedTime")}
            fullWidth
          />

          <TextField
            label="Task Description"
            multiline
            rows={3}
            {...formik.getFieldProps("taskDescription")}
            fullWidth
          />

          <input
            type="file"
            accept=".csv,.pdf,.doc,.docx,image/*"
            onChange={(event) =>
              formik.setFieldValue("attachment", event.currentTarget.files[0])
            }
          />

          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TaskCreationForm;
