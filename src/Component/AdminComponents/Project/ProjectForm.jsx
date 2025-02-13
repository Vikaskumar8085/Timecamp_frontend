import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  ListItemText,
} from "@mui/material";
import {AddCircleOutline, RemoveCircleOutline} from "@mui/icons-material";
import {fetchclientapicall} from "../../../ApiServices/AdminApiServices/Client/index";
import {
  createprojectapicall,
  fetchstaffmembersapicall,
} from "../../../ApiServices/ProjectApiServices";
import {fetchroleapicall} from "../../../ApiServices/MasterApiServices/Roles";

// Function to generate a random project code
const generateProjectCode = () =>
  `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;

const ProjectForm = ({handleSubmit}) => {
  const [clients, setClients] = useState([]);
  const [IsStaffdata, setIsstaffdata] = useState([]);
  const [IsRoledata, setIsRoledata] = useState([]);
  const getclientdata = async () => {
    try {
      const response = await fetchclientapicall();
      if (response.success) {
        setClients(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getroledata = async () => {
    try {
      const response = await fetchroleapicall();
      if (response.success) {
        setIsRoledata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const getstaffdata = async () => {
    try {
      const response = await fetchstaffmembersapicall();
      if (response.success) {
        setIsstaffdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Project_Name: "",
      Project_Code: generateProjectCode(),
      clientId: "",
      Project_ManagersId: "",
      Start_Date: "",
      End_Date: "",
      Project_Hours: "",
      RoleResource: [{RRId: "", RId: ""}],
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
      RoleResources: Yup.array().of(
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
      values.RoleResource.forEach((role, index) => {
        if (role.RRId === values.Project_ManagersId) {
          if (!errors.RoleResource) errors.RoleResource = [];
          errors.RoleResource[index] = {
            RRId: "Cannot select Project Manager as a Role Resource",
          };
        }
      });
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      handleSubmit(values);
    },
  });

  // Function to add a new RoleResource entry
  const addRoleResource = () => {
    formik.setValues({
      ...formik.values,
      RoleResource: [...formik.values.RoleResource, {RRId: "", RId: ""}],
    });
  };

  // Function to remove a RoleResource entry
  const removeRoleResource = (index) => {
    const updatedRoles = [...formik.values.RoleResource];
    updatedRoles.splice(index, 1);
    formik.setValues({...formik.values, RoleResource: updatedRoles});
  };
  useEffect(() => {
    getclientdata();
    getstaffdata();
    getroledata();
  }, [0]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Project Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Code"
              name="Project_Code"
              value={formik.values.Project_Code}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="client-select-label">Select Client</InputLabel>
              <Select
                labelId="client-select-label"
                id="client-select"
                name="clientId"
                value={formik.values.clientId}
                onChange={formik.handleChange}
                label="Select Client"
              >
                {clients.map((client) => (
                  <MenuItem key={client.Client_Id} value={client.Client_Id}>
                    <ListItemText primary={client.Client_Name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Project Manager</InputLabel>
              <Select
                name="Project_ManagersId"
                value={formik.values.Project_ManagersId}
                onChange={formik.handleChange}
              >
                {IsStaffdata.map((item) => (
                  <MenuItem key={item.staff_Id} value={item.staff_Id}>
                    {item.FirstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="Start_Date"
              InputLabelProps={{shrink: true}}
              value={formik.values.Start_Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.Start_Date && Boolean(formik.errors.Start_Date)
              }
              helperText={formik.touched.Start_Date && formik.errors.Start_Date}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="End_Date"
              InputLabelProps={{shrink: true}}
              value={formik.values.End_Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.End_Date && Boolean(formik.errors.End_Date)}
              helperText={formik.touched.End_Date && formik.errors.End_Date}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Hours"
              name="Project_Hours"
              type="number"
              value={formik.values.Project_Hours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.Project_Hours &&
                Boolean(formik.errors.Project_Hours)
              }
              helperText={
                formik.touched.Project_Hours && formik.errors.Project_Hours
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Role Resources</Typography>
          </Grid>
          {/* fghfgh */}
          <Grid item xs={12}>
            {formik.values.RoleResource.map((role, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Resource</InputLabel>
                    <Select
                      name={`RoleResource[${index}].RRId`}
                      value={role.RRId}
                      onChange={formik.handleChange}
                      error={
                        formik.errors.RoleResource &&
                        formik.errors.RoleResource[index] &&
                        Boolean(formik.errors.RoleResource[index].RRId)
                      }
                    >
                      {IsStaffdata.filter(
                        (item) =>
                          item.staff_Id !== formik.values.Project_ManagersId
                      ).map((item) => (
                        <MenuItem key={item.staff_Id} value={item.staff_Id}>
                          {item.FirstName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.RoleResource &&
                      formik.errors.RoleResource[index] &&
                      formik.errors.RoleResource[index].RRId && (
                        <Typography color="error">
                          {formik.errors.RoleResource[index].RRId}
                        </Typography>
                      )}
                  </FormControl>
                  {/* <TextField
                    fullWidth
                    label="Role Resource ID"
                    name={`RoleResource[${index}].RRId`}
                    value={role.RRId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.RoleResource?.[index]?.RRId &&
                      Boolean(formik.errors.RoleResource?.[index]?.RRId)
                    }
                    helperText={
                      formik.touched.RoleResource?.[index]?.RRId &&
                      formik.errors.RoleResource?.[index]?.RRId
                    }
                  /> */}
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="Role-resourse-select-label">
                      Resources
                    </InputLabel>
                    <Select
                      labelId="recourses-select-label"
                      id="resourse-select"
                      label="Resource ID"
                      name={`RoleResource[${index}].RId`}
                      value={role.RId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.RoleResource?.[index]?.RId &&
                        Boolean(formik.errors.RoleResource?.[index]?.RId)
                      }
                      helperText={
                        formik.touched.RoleResource?.[index]?.RId &&
                        formik.errors.RoleResource?.[index]?.RId
                      }
                    >
                      {IsStaffdata.map((item) => (
                        <MenuItem key={item.staff_Id} value={item.staff_Id}>
                          <ListItemText primary={item.FirstName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <TextField
                    fullWidth
                    label="Resource ID"
                    name={`RoleResource[${index}].RId`}
                    value={role.RId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.RoleResource?.[index]?.RId &&
                      Boolean(formik.errors.RoleResource?.[index]?.RId)
                    }
                    helperText={
                      formik.touched.RoleResource?.[index]?.RId &&
                      formik.errors.RoleResource?.[index]?.RId
                    }
                  /> */}
                </Grid>
                <Grid item xs={12}>
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
          {/* jhkhjk */}
          <Grid item xs={12}>
            <Button
              onClick={addRoleResource}
              variant="outlined"
              startIcon={<AddCircleOutline />}
            >
              Add Role
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProjectForm;
