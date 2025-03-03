import React, { useEffect, useState } from "react";
import {
  fetchmanagerclientsapicall,
  fetchmanagerrolesapicall,
  fetchmanagerstaffapicall,
} from "../../ApiServices/ManagerApiServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const ManageProjectForm = ({ handleSubmit }) => {
  const [isclientdata, setisclientdata] = useState([]);
  const [isrolesdata, setIsrolesdata] = useState([]);
  const [isstaffdata, setisstaffdata] = useState([]);

  const fetchclientfunc = async () => {
    try {
      const response = await fetchmanagerclientsapicall();
      if (response.success) {
        setisclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchrolesfunc = async () => {
    try {
      const response = await fetchmanagerrolesapicall();
      if (response?.success) {
        setIsrolesdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchstafffunc = async () => {
    try {
      const response = await fetchmanagerstaffapicall();
      if (response?.success) {
        setisstaffdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchclientfunc();
    fetchrolesfunc();
    fetchstafffunc();
  }, [0]);

  const formik = useFormik({
    initialValues: {
      Project_Name: "",
      clientId: "",
      Project_ManagersId: "",
      Project_Type: "",
      Start_Date: "",
      End_Date: "",
      Project_Hours: "",
      roleResources: [{ RRId: "", RId: "" }],
    },
    validationSchema: Yup.object({
      Project_Name: Yup.string().required("Project Name is required"),
      clientId: Yup.string().required("Client ID is required"),
      Project_ManagersId: Yup.string().required("Client ID is required"),
      Start_Date: Yup.date().required("Start Date is required"),
      End_Date: Yup.date()
        .min(Yup.ref("Start_Date"), "End Date must be after Start Date")
        .required("End Date is required"),
      Project_Hours: Yup.number()
        .positive("Hours must be a positive number")
        .required("Project Hours are required"),
      roleResources: Yup.array().of(
        Yup.object({
          RRId: Yup.number()
            .required("Required")
            .test(
              "not-same-as-manager",
              "RR ID cannot be the same as Project Manager ID",
              function (value) {
                return value !== this.parent.Project_ManagersId;
              }
            ),
          RId: Yup.number().required("Required"),
        })
      ),
    }),
    validate: (values) => {
      let errors = {};
      values.roleResources.forEach((role, index) => {
        if (role.RRId === values.Project_ManagersId) {
          if (!errors.roleResources) errors.roleResources = [];
          errors.roleResources[index] = {
            RRId: "Cannot select Project Manager as a Role Resource",
          };
        }
      });
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      handleSubmit(values);
      // formik.resetForm();
    },
  });

  const addRoleResource = () => {
    formik.setValues({
      ...formik.values,
      roleResources: [...formik.values.roleResources, { RRId: "", RId: "" }],
    });
  };

  // Function to remove a RoleResource entry
  const removeRoleResource = (index) => {
    const updatedRoles = [...formik.values.roleResources];
    updatedRoles.splice(index, 1);
    formik.setValues({ ...formik.values, roleResources: updatedRoles });
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography
          sx={{ my: 3, textTransform: "capitalize" }}
          variant={"h5"}
          gutterBottom
        >
          {" "}
          <strong>Add project</strong>
        </Typography>

        <form action="" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="Project Name"
                name="Project_Name"
                value={formik.values.Project_Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Project_Name &&
                  Boolean(formik.errors.Project_Name)
                }
                helperText={
                  formik.touched.Project_Name && formik.errors.Project_Name
                }
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="Project Hours"
                name="Project_Hours"
                type="number"
                value={formik.values.Project_Hours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Project_Hours && !!formik.errors.Project_Hours
                }
                helperText={
                  formik.touched.Project_Hours
                    ? formik.errors.Project_Hours
                    : ""
                }
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="client-select-label">Select Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  id="client-select"
                  name="clientId"
                  value={formik.values.clientId}
                  onChange={formik.handleChange}
                  label="Select Client"
                  fullWidth
                >
                  {isclientdata.map((client) => (
                    <MenuItem key={client.Client_Id} value={client.Client_Id}>
                      <ListItemText primary={client.Client_Name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="Start_Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.Start_Date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Start_Date && Boolean(formik.errors.Start_Date)
                }
                helperText={
                  formik.touched.Start_Date && formik.errors.Start_Date
                }
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="End_Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.End_Date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.End_Date && Boolean(formik.errors.End_Date)
                }
                helperText={formik.touched.End_Date && formik.errors.End_Date}
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Project Manager</InputLabel>
                <Select
                  name="Project_ManagersId"
                  value={formik.values.Project_ManagersId}
                  onChange={formik.handleChange}
                >
                  {isstaffdata.map((item) => (
                    <MenuItem key={item.staff_Id} value={item.staff_Id}>
                      {item.FirstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ sm: 12 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="select-project-type">
                  Select Project Type
                </InputLabel>
                <Select
                  labelId="select-project-type"
                  id="project-type-select"
                  name="Project_Type"
                  value={formik.values.Project_Type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Project_Type &&
                    Boolean(formik.errors.Project_Type)
                  }
                >
                  <MenuItem value="Full Time Resources">
                    Full Time Resources
                  </MenuItem>
                  <MenuItem value="Time and Material">
                    Time and Material
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ sm: 12 }}>
              <Grid size={{ xs: 12, sm: 12 }}>
                {formik.values.roleResources.map((role, index) => (
                  <Grid container spacing={2} key={index} alignItems="center">
                    <Grid size={{ xs: 6 }}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Select Resource</InputLabel>
                        <Select
                          name={`roleResources[${index}].RRId`}
                          value={role.RRId}
                          onChange={formik.handleChange}
                          error={
                            formik.errors.roleResources &&
                            formik.errors.roleResources[index] &&
                            Boolean(formik.errors.roleResources[index].RRId)
                          }
                        >
                          {isstaffdata
                            .filter(
                              (item) =>
                                item.staff_Id !==
                                formik.values.Project_ManagersId
                            )
                            .map((item) => (
                              <MenuItem
                                key={item.staff_Id}
                                value={item.staff_Id}
                              >
                                {item.FirstName}
                              </MenuItem>
                            ))}
                        </Select>
                        {formik.errors.roleResources &&
                          formik.errors.roleResources[index] &&
                          formik.errors.roleResources[index].RRId && (
                            <Typography color="error">
                              {formik.errors.roleResources[index].RRId}
                            </Typography>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="Role-resourse-select-label">
                          Role Name
                        </InputLabel>
                        <Select
                          labelId="recourses-select-label"
                          id="resourse-select"
                          label="Resource ID"
                          name={`roleResources[${index}].RId`}
                          value={role.RId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.roleResources?.[index]?.RId &&
                            Boolean(formik.errors.roleResources?.[index]?.RId)
                          }
                          helperText={
                            formik.touched.roleResources?.[index]?.RId &&
                            formik.errors.roleResources?.[index]?.RId
                          }
                        >
                          {isrolesdata.map((item) => (
                            <MenuItem key={item.RoleId} value={item.RoleId}>
                              <ListItemText primary={item.RoleName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <IconButton
                        onClick={() => removeRoleResource(index)}
                        color="secondary"
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  onClick={addRoleResource}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Role
                </Button>
              </Grid>
            </Grid>
            <Grid size={{ sm: 12 }}>
              <Button
                fullWidth
                type="submit"
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  margin: "10px 0px",
                  color: "white",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default ManageProjectForm;
