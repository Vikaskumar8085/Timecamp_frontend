import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
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
  FormControlLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {AddCircleOutline, RemoveCircleOutline} from "@mui/icons-material";
import {fetchclientapicall} from "../../../ApiServices/AdminApiServices/Client/index";
import {
  createprojectapicall,
  fetchstaffmembersapicall,
} from "../../../ApiServices/ProjectApiServices";
import {fetchroleapicall} from "../../../ApiServices/MasterApiServices/Roles";

const ProjectForm = ({handleSubmit, IsEdit}) => {
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
      Project_Name: IsEdit?.Project_Name ?? "",
      clientId: IsEdit?.clientId ?? "",
      Project_ManagersId: IsEdit?.Project_ManagersId ?? "",
      Project_Type: IsEdit?.Project_Type ?? "",
      Start_Date: IsEdit?.Start_Date ?? "",
      End_Date: IsEdit?.End_Date ?? "",
      Project_Hours: IsEdit?.Project_Hours ?? "",
      roleProjectMangare:
        Array.isArray(IsEdit?.roleProjectMangare) &&
        IsEdit.roleProjectMangare.length > 0
          ? IsEdit.roleProjectMangare.map((resource) => ({
              RRId: resource?.RRId ?? "",
              RId: resource?.RId ?? "",
              billable: resource?.billable ?? false,
              Units: resource?.Units ?? "",
              Currency: resource?.Currency ?? "",
              Rate: resource?.Rate ?? "",
              Type: resource?.Type ?? "",
            }))
          : [
              {
                RRId: "",
                RId: "",
                billable: false,
                Units: "",
                Rate: "",
                Type: "",
              },
            ],

      roleResources:
        Array.isArray(IsEdit?.roleResources) && IsEdit.roleResources.length > 0
          ? IsEdit.roleResources.map((resource) => ({
              RRId: resource?.RRId ?? "",
              RId: resource?.RId ?? "",
              billable: resource?.billable ?? false,
              Units: resource?.Units ?? "",
              Currency: resource?.Currency ?? "",
              Rate: resource?.Rate ?? "",
              Type: resource?.Type ?? "",
            }))
          : [
              {
                RRId: "",
                RId: "",
                billable: false,
                Units: "",
                Rate: "",
                Type: "",
              },
            ],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleSubmit(values);
      console.log(values, "vlaues");
      formik.resetForm();
    },
  });

  const addRoleResource = () => {
    formik.setValues({
      ...formik.values,
      roleResources: [
        ...formik.values.roleResources,
        {
          RRId: "",
          RId: "",
          billable: false,
          Units: "",
          Rate: "",
          Type: "",
        },
      ],
    });
  };

  //
  const addroleProjectMangare = () => {
    formik.setValues({
      ...formik.values,
      roleProjectMangare: [
        ...formik.values.roleProjectMangare,
        {
          RRId: "",
          RId: "",
          billable: false,
          Units: "",
          Rate: "",
          Type: "",
        },
      ],
    });
  };
  const removeRoleResource = (index) => {
    const updatedRoles = [...formik.values.roleResources];
    updatedRoles.splice(index, 1);
    formik.setValues({...formik.values, roleResources: updatedRoles});
  };

  useEffect(() => {
    getclientdata();
    getstaffdata();
    getroledata();
  }, [0]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" gutterBottom>
        Add Project
      </Typography>

      <form action="" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <TextField
              margin="normal"
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
          <Grid size={{sm: 12, md: 6, xs: 12}}>
            <TextField
              fullWidth
              margin="normal"
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
                formik.touched.Project_Hours ? formik.errors.Project_Hours : ""
              }
            />
          </Grid>
          <Grid size={{sm: 12, md: 6, xs: 12}}>
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
                {clients.map((client) => (
                  <MenuItem key={client.Client_Id} value={client.Client_Id}>
                    <ListItemText primary={client.Client_Name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <TextField
              fullWidth
              margin="normal"
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
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <TextField
              fullWidth
              margin="normal"
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
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <TextField
              fullWidth
              margin="normal"
              label="Currency"
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{sm: 12}}>
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
                <MenuItem value="Fixed">Fixed</MenuItem>
                <MenuItem value="Bucket">Bucket</MenuItem>s
                <MenuItem value="Full Time Resources">
                  Full Time Resources
                </MenuItem>
                <MenuItem value="Time and Material">Time and Material</MenuItem>
              </Select>
            </FormControl>

            {formik.values.Project_Type === "Fixed" && (
              <>
                <TextField
                  fullWidth
                  type="text"
                  label="Project Estimate Hours"
                  name="Project_Estimate_Hours"
                />
              </>
            )}
          </Grid>
          <Grid size={{sm: 12}}>
            <Grid size={{xs: 12, sm: 12}}>
              <Typography variant="h6">Select Project Managers</Typography>

              {formik.values.roleResources.map((role, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select Resource</InputLabel>
                      <Select
                        name={`roleResources[${index}].RRId`}
                        value={role.RRId}
                        onChange={formik.handleChange}
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
                    </FormControl>
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Role Name</InputLabel>
                      <Select
                        name={`roleResources[${index}].RId`}
                        value={role.RId}
                        onChange={formik.handleChange}
                      >
                        {IsRoledata.map((item) => (
                          <MenuItem key={item.RoleId} value={item.RoleId}>
                            {item.RoleName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`roleResources[${index}].billable`}
                          checked={role.billable}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label="Billable"
                    />
                  </Grid>
                  {role.billable && (
                    <>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Units"
                          name={`roleResources[${index}].Units`}
                          value={role.Units}
                          onChange={formik.handleChange}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Rate"
                          name={`roleResources[${index}].Rate`}
                          type="number"
                          value={role.Rate}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Type"
                          name={`roleResources[${index}].Type`}
                          value={role.Type}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <IconButton
                      onClick={() => removeRoleResource(index)}
                      color="secondary"
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={addRoleResource}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Role
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{sm: 12}}>
            <Grid size={{xs: 12, sm: 12}}>
              <Typography variant="h6">Select Resources</Typography>

              {formik.values.roleProjectMangare.map((role, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select Resource</InputLabel>
                      <Select
                        name={`roleProjectMangare[${index}].RRId`}
                        value={role.RRId}
                        onChange={formik.handleChange}
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
                    </FormControl>
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Role Name</InputLabel>
                      <Select
                        name={`roleProjectMangare[${index}].RId`}
                        value={role.RId}
                        onChange={formik.handleChange}
                      >
                        {IsRoledata.map((item) => (
                          <MenuItem key={item.RoleId} value={item.RoleId}>
                            {item.RoleName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`roleProjectMangare[${index}].billable`}
                          checked={role.billable}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label="Billable"
                    />
                  </Grid>
                  {role.billable && (
                    <>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Units"
                          name={`roleProjectMangare[${index}].Units`}
                          value={role.Units}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      {/* <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Currency"
                          name={`roleProjectMangare[${index}].Currency`}
                          value={role.Currency}
                          onChange={formik.handleChange}
                        />
                      </Grid> */}
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Rate"
                          name={`roleProjectMangare[${index}].Rate`}
                          type="number"
                          value={role.Rate}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Type"
                          name={`roleProjectMangare[${index}].Type`}
                          value={role.Type}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <IconButton
                      onClick={() => removeRoleResource(index)}
                      color="secondary"
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={addroleProjectMangare}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Resources
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{sm: 12}}>
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
  );
};

export default ProjectForm;
