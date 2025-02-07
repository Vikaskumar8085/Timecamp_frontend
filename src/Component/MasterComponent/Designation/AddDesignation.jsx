import {useFormik} from "formik";
import React from "react";
import {Button, Box, Typography, TextField, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DesignationValidate from "../../../validation/mastervalidation/Designation";
const AddDesignation = ({handleSubmit}) => {
  const formik = useFormik({
    initialValues: {
      Designation_Name: "",
    },
    validationSchema: DesignationValidate,
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
                  id="Designation_Name"
                  name="Designation_Name"
                  label="Designation Name"
                  variant="outlined"
                  value={formik.values.Designation_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Designation_Name &&
                    Boolean(formik.errors.Designation_Name)
                  }
                  helperText={
                    formik.touched.Designation_Name &&
                    formik.errors.Designation_Name
                  }
                />
              </Grid>
              <Grid size={{sm: 12, xs: 12}}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
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

export default AddDesignation;
