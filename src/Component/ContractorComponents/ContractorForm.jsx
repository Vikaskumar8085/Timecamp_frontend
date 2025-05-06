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
  ListItemText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Input from "../../common/Input/Input";
import {AddCircleOutline, RemoveCircleOutline} from "@mui/icons-material";
import {
  fetchemployeeclientsapicall,
  fetchemployeerolesapicall,
  fetchemployeestaffapicall,
} from "../../ApiServices/EmployeeApiservices/Employee";

const ContractorForm = () => {
  const [isclientdata, setisclientdata] = useState([]);
  const [isrolesdata, setIsrolesdata] = useState([]);
  const [isstaffdata, setisstaffdata] = useState([]);

  const fetchclientfunc = async () => {
    try {
      const response = await fetchemployeeclientsapicall();
      if (response.success) {
        setisclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchrolesfunc = async () => {
    try {
      const response = await fetchemployeerolesapicall();
      if (response?.success) {
        setIsrolesdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchstafffunc = async () => {
    try {
      const response = await fetchemployeestaffapicall();
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
      Project_Type: "",
      Start_Date: "",
      End_Date: "",
      Project_Hours: "",
      project_Estimate_hours: "",
      Currency: "",
      bucket: [{bucketHourly: "", bucketHourlyRate: ""}],
      roleResources: [
        {
          RRId: "",
          RId: "",
          billable: false,
          Rate: "",
          Unit: "",
          Engagement_Ratio: "",
        },
      ],
      selectProjectManagers: [
        {
          RRId: "",
          RId: "",
          billable: false,
          Rate: "",
          Unit: "",
          Engagement_Ratio: "",
        },
      ],
    },

    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      // handleSubmit(values);
      // formik.resetForm();
    },
  });
  // add Role Resource
  const addRoleResource = () => {
    formik.setValues({
      ...formik.values,
      roleResources: [...formik.values.roleResources, {RRId: "", RId: ""}],
    });
  };
  // add Role Resource

  // add Multibucket
  const addMultiBucket = () => {
    const updatedBuckets = [
      ...formik.values.bucket,
      {bucketHourly: "", bucketHourlyRate: ""},
    ];
    formik.setFieldValue("bucket", updatedBuckets);
  };
  // add Multibucket
  // remove Bucket
  const removeBucket = (index) => {
    const updatedBucket = [...formik.values.bucket];
    updatedBucket.splice(index, 1);
    formik.setFieldValue("bucket", updatedBucket);
  };
  // remove Bucket
  // Function to remove a RoleResource entry
  const removeRoleResource = (index) => {
    const updatedRoles = [...formik.values.roleResources];
    updatedRoles.splice(index, 1);
    formik.setValues({...formik.values, roleResources: updatedRoles});
  };
  //  remove Role Resource
  // add select Project Manager
  const addMultipleResource = () => {
    const newEntry = {
      RRId: "",
      RId: "",
      billable: false,
      Unit: "",
      Rate: "",
      Engagement_Ratio: "",
    };
    formik.setFieldValue("selectProjectManagers", [
      ...formik.values.selectProjectManagers,
      newEntry,
    ]);
  };

  const removeMultipleResource = (index) => {
    const updated = [...formik.values.selectProjectManagers];
    updated.splice(index, 1);
    formik.setFieldValue("selectProjectManagers", updated);
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography
          sx={{my: 3, textTransform: "capitalize"}}
          variant={"h5"}
          gutterBottom
        >
          {" "}
          <strong>Add project</strong>
        </Typography>

        <form action="" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                labelText="Project Name"
                placeholder={"Please enter Project Name"}
                {...formik.getFieldProps("Project_Name")}
                type={"text"}
              />
            </Grid>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                type={"Number"}
                labelText={"Project Hours"}
                placeholder={"Please Enter Project Hours"}
                {...formik.getFieldProps("Project_Hours")}
              />
            </Grid>
            <Grid size={{sm: 12}}>
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
            <Grid size={{sm: 12, md: 6}}>
              <Input
                type="date"
                labelText="Start Date"
                name="Start_Date"
                {...formik.getFieldProps("Start_Date")}
              />
            </Grid>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                type="date"
                labelText="End Date"
                name="End_Date"
                {...formik.getFieldProps("End_Date")}
              />
            </Grid>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                type={"text"}
                labelText={"Currency"}
                placeholder={"Please Enter your Currency"}
                {...formik.getFieldProps("Currency")}
              />
            </Grid>
            <Grid size={{sm: 12}}>
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
                  <MenuItem value="Full Time Resources">
                    Full Time Resources
                  </MenuItem>
                  <MenuItem value="Time and Material">
                    Time and Material
                  </MenuItem>
                  <MenuItem value="Bucket">Bucket</MenuItem>
                  <MenuItem value="Fixed">Fixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/*Bucket */}
            {formik.values.Project_Type === "Fixed" && (
              <>
                <Grid size={{sm: 12, md: 12}}>
                  <Input
                    labelText={"Project Hours"}
                    placeholder={"please Enter your Project Hours"}
                    {...formik.getFieldProps("project_Estimate_hours")}
                  />
                </Grid>
              </>
            )}
            {formik.values.Project_Type === "Bucket" && (
              <>
                {formik.values.bucket.map((item, index) => {
                  return (
                    <>
                      <Grid size={{sm: 12, md: 5}}>
                        <Input
                          labelText="Backet Hourly"
                          placeholder={"please Enter your Bucket Duration"}
                          name={`bucket[${index}].bucketHourly`}
                          type="number"
                          value={item.bucketHourly}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={{sm: 12, md: 5}}>
                        <Input
                          labelText="Bucket Hourly Rate"
                          id={`bucket-${index}-rate`}
                          name={`bucket[${index}].bucketHourlyRate`}
                          type="number"
                          placeholder="Please enter your bucket rate"
                          value={item.bucketHourlyRate}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid size={{sm: 12, md: 2}}>
                        <Button variant="outlined" onClick={addMultiBucket}>
                          Add
                        </Button>
                        {formik.values.bucket.length > 1 && (
                          <Button
                            // color="error"
                            variant="outlined"
                            onClick={() => removeBucket(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </Grid>
                    </>
                  );
                })}
              </>
            )}
            {/*Bucket */}

            {/* select Role Resources */}
            <Grid size={{sm: 12}}>
              <Typography variant="h5">Select Role Resource</Typography>
              <Grid size={{xs: 12, sm: 12}}>
                {formik.values.roleResources.map((role, index) => (
                  <Grid container spacing={2} key={index} alignItems="center">
                    <Grid size={{xs: 6}}>
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
                    {/* select role resource select label */}
                    <Grid size={{xs: 6}}>
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

                    <Grid size={{md: 6, sm: 12}}>
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
                        <Grid size={{md: 6, sm: 12}}>
                          <TextField
                            fullWidth
                            label="Units"
                            name={`roleResources[${index}].Unit`}
                            value={role.Unit}
                            onChange={formik.handleChange}
                          />
                        </Grid>

                        <Grid size={{md: 6, sm: 12}}>
                          <TextField
                            fullWidth
                            label="Rate"
                            type="number"
                            name={`roleResources[${index}].Rate`}
                            value={role.Rate}
                            onChange={formik.handleChange}
                          />
                        </Grid>

                        <Grid size={{md: 6, sm: 12}}>
                          <TextField
                            fullWidth
                            label="Type"
                            name={`roleResources[${index}].Engagement_Ratio`}
                            value={role.Engagement_Ratio}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                      </>
                    )}

                    <Grid size={{xs: 12, sm: 6}}>
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
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  onClick={addRoleResource}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Role
                </Button>
              </Grid>
            </Grid>
            {/* select Role Resources */}
            {/* select project Manager */}
            <Grid container spacing={2}>
              <Typography variant="h5">Select Project Managers</Typography>
              {formik.values.selectProjectManagers.map((item, index) => (
                <Grid size={{sm: 12}} key={index}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{sm: 12, md: 6}}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Select Resource</InputLabel>
                        <Select
                          name={`selectProjectManagers[${index}].RRId`}
                          value={item.RRId}
                          onChange={formik.handleChange}
                        >
                          {/* {IsStaffdata.filter(
              (item) => item.staff_Id !== formik.values.Project_ManagersId
            ).map((item) => (
              <MenuItem key={item.staff_Id} value={item.staff_Id}>
                {item.FirstName}
              </MenuItem>
            ))} */}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid size={{sm: 12, md: 6}}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Role Name</InputLabel>
                        <Select
                          name={`selectProjectManagers[${index}].RId`}
                          value={item.RId}
                          fullWidth
                          onChange={formik.handleChange}
                        >
                          {/* {IsRoledata.map((item) => (
              <MenuItem key={item.RoleId} value={item.RoleId}>
                {item.RoleName}
              </MenuItem>
            ))} */}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid size={{sm: 12, md: 6}}>
                      <FormControlLabel
                        fullWidth
                        control={
                          <Checkbox
                            name={`selectProjectManagers[${index}].billable`}
                            checked={item.billable}
                            onChange={formik.handleChange}
                            color="primary"
                          />
                        }
                        label="Billable"
                      />
                    </Grid>

                    {item.billable && (
                      <>
                        <Grid size={{sm: 12, md: 6}}>
                          <TextField
                            fullWidth
                            label="Units"
                            name={`selectProjectManagers[${index}].Unit`}
                            value={item.Unit}
                            onChange={formik.handleChange}
                          />
                        </Grid>

                        <Grid size={{sm: 12, md: 6}}>
                          <TextField
                            fullWidth
                            label="Rate"
                            type="number"
                            name={`selectProjectManagers[${index}].Rate`}
                            value={item.Rate}
                            onChange={formik.handleChange}
                          />
                        </Grid>

                        <Grid size={{sm: 12, md: 6}}>
                          <TextField
                            fullWidth
                            label="Type"
                            name={`selectProjectManagers[${index}].Engagement_Ratio`}
                            value={item.Engagement_Ratio}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                      </>
                    )}

                    <Grid size={{sm: 12, md: 6}}>
                      <IconButton
                        onClick={() => removeRoleResource(index)}
                        color="secondary"
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid size={{sm: 12, md: 6}}>
                      <Button
                        variant="outlined"
                        onClick={() => removeMultipleResource(index)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  onClick={addMultipleResource}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Role
                </Button>
              </Grid>
            </Grid>
            {/* select project Manager */}

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
    </>
  );
};

export default ContractorForm;
