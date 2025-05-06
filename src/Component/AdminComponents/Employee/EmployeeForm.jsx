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
  OutlinedInput,
  ListItemText,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import {fetchdesignationapicall} from "../../../ApiServices/MasterApiServices/Designation";
import toast from "react-hot-toast";
import {fetchstaffmemberapicall} from "../../../ApiServices/AdminApiServices/Admin";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";

const EmployeeForm = ({handleSubmit, IsEdit, updateEmployeeFunc}) => {
  const [designations, setDesignations] = useState([]);
  const [Ismanagerid, setIsmanagerid] = useState([]);

  const formik = useFormik({
    initialValues: {
      FirstName: IsEdit?.FirstName || "",
      LastName: IsEdit?.LastName || "",
      Email: IsEdit?.Email || "",
      Address: IsEdit?.Address || "",
      Phone: IsEdit?.Phone || "",
      DesignationId: IsEdit?.DesignationId || "",
      Backlog_Entries: IsEdit?.Backlog_Entries || "",
      Socail_Links: IsEdit?.Socail_Links || "",
      Permission: IsEdit?.Permission || false,
      ManagerId: IsEdit?.ManagerId || "",
      Profile: IsEdit?.Profile || null,
      Joining_Date: IsEdit?.Joining_Date || "",
      days: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (IsEdit) {
        updateEmployeeFunc(formData);
        formik.resetForm();
      } else {
        handleSubmit(formData);
        formik.resetForm();
      }
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

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <Container maxWidth="md">
      <Box sx={{p: 2, mt: 4}}>
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
                InputLabelProps={{shrink: true}}
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
                  {Ismanagerid.filter((item) => item.Role === "Employee").map(
                    (item) => (
                      <MenuItem key={item.staff_Id} value={item.staff_Id}>
                        {item.FirstName}
                      </MenuItem>
                    )
                  )}
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
              <TextField
                label="Currency"
                fullWidth
                {...formik.getFieldProps("Currency")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="unit"
                fullWidth
                {...formik.getFieldProps("unit")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cost"
                fullWidth
                {...formik.getFieldProps("Cost")}
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
              <FormControl fullWidth>
                <InputLabel id="days-label">Select Week off Days</InputLabel>
                <Select
                  labelId="days-label"
                  id="days"
                  name="days"
                  multiple
                  value={formik.values.days}
                  onChange={formik.handleChange}
                  input={<OutlinedInput label="Select Days" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox
                        checked={formik.values.days.indexOf(day) > -1}
                      />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputFileupload
                type="file"
                title="Upload Profile Picture"
                paragraph={"Please upload your Profile Picture "}
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) =>
                  formik.setFieldValue("Profile", event.currentTarget.files[0])
                }
              />
              <Typography variant="body2"></Typography>
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
                  "&:hover": {background: "#1a252f"},
                }}
              >
                {" "}
                {IsEdit ? "update  " : " Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
