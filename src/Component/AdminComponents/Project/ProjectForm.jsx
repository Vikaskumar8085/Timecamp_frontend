import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, MenuItem, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const existingProjectCodes = ["P001", "P002", "P003", "P004", "P005"]; // Mock database

const generateProjectCode = () => {
  let lastCode = existingProjectCodes[existingProjectCodes.length - 1] || "P000";
  let nextNumber = parseInt(lastCode.substring(1)) + 1;
  return `P${nextNumber.toString().padStart(3, "0")}`;
};

const ProjectForm = () => {
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    setGeneratedCode(generateProjectCode());
  }, []);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      projectCode: generatedCode,
      clientName: "",
      startDate: "",
      endDate: "",
      projectType: "",
      employees: [{ role: "", name: "" }],
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project Name is required"),
      clientName: Yup.string().required("Client Name is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required("End Date is required"),
      projectType: Yup.string().required("Project Type is required"),
      employees: Yup.array().of(
        Yup.object({
          role: Yup.string().required("Role is required"),
          name: Yup.string().required("Employee Name is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Project Name"
            {...formik.getFieldProps("projectName")}
            error={formik.touched.projectName && Boolean(formik.errors.projectName)}
            helperText={formik.touched.projectName && formik.errors.projectName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Project Code"
            value={generatedCode}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Client Name"
            {...formik.getFieldProps("clientName")}
            error={formik.touched.clientName && Boolean(formik.errors.clientName)}
            helperText={formik.touched.clientName && formik.errors.clientName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            {...formik.getFieldProps("startDate")}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="End Date"
            {...formik.getFieldProps("endDate")}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Project Type"
            {...formik.getFieldProps("projectType")}
            error={formik.touched.projectType && Boolean(formik.errors.projectType)}
            helperText={formik.touched.projectType && formik.errors.projectType}
          >
            <MenuItem value="Internal">Internal</MenuItem>
            <MenuItem value="Client">Client</MenuItem>
          </TextField>
        </Grid>

        {formik.values.employees.map((employee, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Role"
                {...formik.getFieldProps(`employees.${index}.role`)}
                error={formik.touched.employees?.[index]?.role && Boolean(formik.errors.employees?.[index]?.role)}
                helperText={formik.touched.employees?.[index]?.role && formik.errors.employees?.[index]?.role}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Employee Name"
                {...formik.getFieldProps(`employees.${index}.name`)}
                error={formik.touched.employees?.[index]?.name && Boolean(formik.errors.employees?.[index]?.name)}
                helperText={formik.touched.employees?.[index]?.name && formik.errors.employees?.[index]?.name}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => formik.setFieldValue("employees", formik.values.employees.filter((_, i) => i !== index))} disabled={formik.values.employees.length === 1}>
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button startIcon={<Add />} onClick={() => formik.setFieldValue("employees", [...formik.values.employees, { role: "", name: "" }])}>
            Add Employee
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProjectForm;
