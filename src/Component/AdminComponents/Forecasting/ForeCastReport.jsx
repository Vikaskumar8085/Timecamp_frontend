import React from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  ListItemText,
  Paper,
  Grid2,
} from "@mui/material";
import {useFormik, FieldArray, FormikProvider} from "formik";

const ProjectForecastForm = () => {
  const isroledata = [
    {RoleId: "1", RoleName: "Frontend Developer"},
    {RoleId: "2", RoleName: "Backend Developer"},
  ];

  const isdesignationdata = [
    {Designation_Id: "1", Designation_Name: "Junior"},
    {Designation_Id: "2", Designation_Name: "Senior"},
  ];

  const formik = useFormik({
    initialValues: {
      Enquiry_Name: "",
      Estimate_Dev_Hours: "",
      Period_Days: "",
      Start_Date: "",
      resourceRequirements: [
        {
          RoleId: "",
          DesignationId: "",
          Min_Exp: "",
          Max_Exp: "",
          Number_of_developer: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log("Submitted data:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <Grid2 component={Paper} sx={{p: 3}} container spacing={2}>
          <Grid2
            sx={{background: "#2c3e50", p: 2, color: "white"}}
            size={{lg: 12, md: 12, sm: 12, xs: 12}}
          >
            <Typography>Project Forecast</Typography>
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              margin="normal"
              label="Enquiry Name"
              name="Enquiry_Name"
              value={formik.values.Enquiry_Name}
              onChange={formik.handleChange}
            />
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              margin="normal"
              label="Estimate Development Hours"
              name="Estimate_Dev_Hours"
              value={formik.values.Estimate_Dev_Hours}
              onChange={formik.handleChange}
            />
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              type="number"
              margin="normal"
              label="Period Days"
              name="Period_Days"
              value={formik.values.Period_Days}
              onChange={formik.handleChange}
            />
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              type="date"
              margin="normal"
              InputLabelProps={{shrink: true}}
              label="Start Date"
              name="Start_Date"
              value={formik.values.Start_Date}
              onChange={formik.handleChange}
            />
          </Grid2>

          <FieldArray name="resourceRequirements">
            {({push, remove}) => (
              <>
                <Grid2
                  sx={{background: "#2c3e50", p: 2, color: "white"}}
                  size={{md: 12, lg: 12, sm: 12, xs: 12}}
                >
                  <Typography>Resource Requirements</Typography>
                </Grid2>

                {formik.values.resourceRequirements.map((_, index) => (
                  <React.Fragment key={index}>
                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`Role-select-label-${index}`}>
                          Select Role
                        </InputLabel>
                        <Select
                          labelId={`Role-select-label-${index}`}
                          id={`Role-select-${index}`}
                          name={`resourceRequirements[${index}].RoleId`}
                          value={
                            formik.values.resourceRequirements[index].RoleId
                          }
                          onChange={formik.handleChange}
                          label="Select Role"
                        >
                          {isroledata.map((item) => (
                            <MenuItem key={item.RoleId} value={item.RoleId}>
                              <ListItemText primary={item.RoleName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`Designation-select-label-${index}`}>
                          Select Designation
                        </InputLabel>
                        <Select
                          labelId={`Designation-select-label-${index}`}
                          id={`Designation-select-${index}`}
                          name={`resourceRequirements[${index}].DesignationId`}
                          value={
                            formik.values.resourceRequirements[index]
                              .DesignationId
                          }
                          onChange={formik.handleChange}
                          label="Select Designation"
                        >
                          {isdesignationdata.map((item) => (
                            <MenuItem
                              key={item.Designation_Id}
                              value={item.Designation_Id}
                            >
                              <ListItemText primary={item.Designation_Name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <TextField
                        fullWidth
                        type="number"
                        margin="normal"
                        label="Min Experience (Years)"
                        name={`resourceRequirements[${index}].Min_Exp`}
                        value={
                          formik.values.resourceRequirements[index].Min_Exp
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <TextField
                        fullWidth
                        type="number"
                        margin="normal"
                        label="Max Experience (Years)"
                        name={`resourceRequirements[${index}].Max_Exp`}
                        value={
                          formik.values.resourceRequirements[index].Max_Exp
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <TextField
                        fullWidth
                        type="number"
                        margin="normal"
                        label="Number of Developer"
                        name={`resourceRequirements[${index}].Number_of_developer`}
                        value={
                          formik.values.resourceRequirements[index]
                            .Number_of_developer
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid2>

                    <Grid2
                      size={{md: 4, sm: 12, xs: 12}}
                      sx={{display: "flex", alignItems: "center"}}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                        disabled={
                          formik.values.resourceRequirements.length === 1
                        }
                      >
                        Remove
                      </Button>
                    </Grid2>
                  </React.Fragment>
                ))}

                <Grid2 size={{md: 12}}>
                  <Button
                    variant="contained"
                    sx={{mt: 1}}
                    onClick={() =>
                      push({
                        RoleId: "",
                        DesignationId: "",
                        Min_Exp: "",
                        Max_Exp: "",
                        Number_of_developer: "",
                      })
                    }
                  >
                    + Add Resource Requirement
                  </Button>
                </Grid2>
              </>
            )}
          </FieldArray>

          <Grid2 size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <Button
              type="submit"
              sx={{background: "#2c3e50", color: "white", mt: 2}}
              fullWidth
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </FormikProvider>
    </form>
  );
};

export default ProjectForecastForm;
