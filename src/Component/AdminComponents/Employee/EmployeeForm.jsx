import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { fetchdesignationapicall } from "../../../ApiServices/MasterApiServices/Designation";
import toast from "react-hot-toast";

const EmployeeForm = () => {
  const [designations, setDesignations] = useState([]);  
  const [Ismanagerid, setIsmanagerid] = useState([]);
  

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Address: "",
      Phone: "",
      DesignationId: "",
      Backlog_Entries: "",
      Socail_Links: "",
      Permission: false,
      ManagerId: "",
      Joining_Date: "",
    },
    onSubmit: async (values) => {
      console.log("Submitted Data:", values);
    },
  });

  const getDesignations = async () => {
    try {
      const response = await fetchdesignationapicall();
      if (response.success) {
        setDesignations(response.result);
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const getstaffmembersfunc = async () => {
    try {
      const response = await fetchstaffmemberapicall();
      if (response.success) {
        setIsmanagerid(response.result);
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  useEffect(() => {
    getDesignations();
    getstaffmembersfunc();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 2 }}>
        <Typography sx={{ mb: 3 }} variant="h5">
          Add Employee
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                placeholder="First Name"
                {...formik.getFieldProps("FirstName")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                placeholder="Last Name"
                {...formik.getFieldProps("LastName")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                placeholder="Email"
                {...formik.getFieldProps("Email")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                placeholder="Phone"
                fullWidth
                {...formik.getFieldProps("Phone")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                placeholder="Address"
                fullWidth
                {...formik.getFieldProps("Address")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Joining Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...formik.getFieldProps("Joining_Date")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Designation</InputLabel>
                <Select
                  {...formik.getFieldProps("DesignationId")}
                  value={formik.values.DesignationId}
                  onChange={formik.handleChange}
                >
                  {designations.map((item) => (
                    <MenuItem
                      key={item.Designation_Id}
                      value={item.Designation_Id}
                    >
                      {item.Designation_Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Manager</InputLabel>
                <Select
                  {...formik.getFieldProps("ManagerId")}
                  value={formik.values.ManagerId}
                  onChange={formik.handleChange}
                >
                  {Ismanagerid.map((item) => (
                    <MenuItem key={item.ManagerId} value={item.ManagerId}>
                      {item.FristName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Skype ID"
                placeholder="Enter your Skype ID or Social Media link"
                fullWidth
                {...formik.getFieldProps("Socail_Links")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Backlog Entries"
                fullWidth
                {...formik.getFieldProps("Backlog_Entries")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.Permission}
                    onChange={formik.handleChange}
                    name="Permission"
                  />
                }
                label="Project Create Permission"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  margin: "10px 0px",
                  color: "white",
                  "&:hover": { background: "#1a252f" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
