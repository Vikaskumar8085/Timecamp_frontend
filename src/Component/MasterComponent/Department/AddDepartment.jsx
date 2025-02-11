import {useFormik} from "formik";
import React from "react";
import {Button, Box, Typography, TextField, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcons from "@mui/icons-material/Add";
const AddDepartment = ({handleSubmit}) => {
  const formik = useFormik({
    initialValues: {
      Department_Name: "",
    },
    // validationSchema: DesignationValidate,
    onSubmit: async (values) => {
      try {
        handleSubmit(values);
        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            p: 1,
          }}
        >
          <Typography variant="h6" component={"h1"}>
            Add Designation
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{sm: 12, xs: 12}} sx={{mt: 3}}>
                <TextField
                  fullWidth
                  id="Department_Name"
                  name="Department_Name"
                  label="Department Name"
                  variant="outlined"
                  value={formik.values.Department_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Department_Name &&
                    Boolean(formik.errors.Department_Name)
                  }
                  helperText={
                    formik.touched.Department_Name &&
                    formik.errors.Department_Name
                  }
                />
              </Grid>
              <Grid size={{sm: 12, xs: 12}}>
                <Button
                  startIcon={<AddIcons />}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    background: "#2c3e50",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default AddDepartment;
