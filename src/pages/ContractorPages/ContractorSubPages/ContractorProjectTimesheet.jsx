import React, { useEffect, useState } from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useFormik } from "formik";
import { Button, Container, Drawer } from "@mui/material";
import * as Yup from "yup";
import { fillcontractorprojecttimesheetapicall } from "../../../ApiServices/ContractorApiServices/ContractorApiServices";

const ContractorProjectTimesheet = ({ id }) => {
  const [isContractoractiveproject, setIsContractoractiveproject] = useState(
    []
  );

  console.log(isContractoractiveproject, "?>>>>>>>>>>??>>>>>>>>>>>>>>>");
  const [IsOpen, setIsOpen] = useState(false);

  const fetchcontractorprojecttimesheetFunc = async () => {
    try {
      const response = await fillcontractorprojecttimesheetapicall(id);
      if (response.success) {
        setIsContractoractiveproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Staff_Id: id,
      hours: "",
      project: "",
      day: "",
      Description: "",
      task_description: "",
      attachement: null,
    },
    validationSchema: Yup.object({
      hours: Yup.string().required("Hours are required"),
      project: Yup.string().required("Project ID is required"),
      day: Yup.string().required("Day is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task description is required"),
      attachement: Yup.mixed().required("Attachment is required"),
    }),
    onSubmit: async (values) => {
      const formdata = new FormData();

      formdata.append("Staff_Id", values.Staff_Id);
      formdata.append("hours", values.hours);
      formdata.append("project", values.project);
      formdata.append("day", values.day);
      formdata.append("Description", values.Description);
      formdata.append("task_description", values.task_description);
      formdata.append("file", values.attachement);
      console.log("Form Data:", formdata);

      try {
        const response = await fillcontractorprojecttimesheetapicall(formdata);
        console.log(response, "?....................?");
        if (response.success) {
          setIsOpen(false);
        }

        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  useEffect(() => {
    fetchcontractorprojecttimesheetFunc();
  }, [0]);
  return (
    <>
      <BreadCrumb pageName="Contractor Project Timesheet" />
      <Button
        onClick={() => setIsOpen(true)}
        // startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Fill Timesheet
      </Button>
      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <Container maxWidth="sm" sx={{ p: 2 }}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Project</InputLabel>
                <Select
                  {...formik.getFieldProps("project")}
                  value={formik.values.project}
                  onChange={formik.handleChange}
                >
                  {[
                    ...(Isemployeeprojects?.response || []),
                    ...(Isemployeeprojects?.employeeactiveProjects || []),
                  ].map((item) => (
                    <MenuItem key={item.ProjectId} value={item.ProjectId}>
                      {item.Project_Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Hours"
                name="hours"
                value={formik.values.hours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.hours && Boolean(formik.errors.hours)}
                helperText={formik.touched.hours && formik.errors.hours}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Day"
                name="day"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.day && Boolean(formik.errors.day)}
                helperText={formik.touched.day && formik.errors.day}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Description"
                name="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Description &&
                  Boolean(formik.errors.Description)
                }
                helperText={
                  formik.touched.Description && formik.errors.Description
                }
                margin="normal"
              />

              <TextField
                fullWidth
                label="Task Description"
                name="task_description"
                value={formik.values.task_description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.task_description &&
                  Boolean(formik.errors.task_description)
                }
                helperText={
                  formik.touched.task_description &&
                  formik.errors.task_description
                }
                margin="normal"
              />

              <input
                type="file"
                name="attachement"
                onChange={(event) =>
                  formik.setFieldValue(
                    "attachement",
                    event.currentTarget.files[0]
                  )
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.attachement && formik.errors.attachement && (
                <div style={{ color: "red" }}>{formik.errors.attachement}</div>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "15px" }}
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Container>
        </Drawer>
      )}
    </>
  );
};

export default ContractorProjectTimesheet;
