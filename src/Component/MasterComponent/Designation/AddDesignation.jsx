import {useFormik} from "formik";
import React from "react";
import {Button, Box, Typography, TextField, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DesignationValidate from "../../../validation/mastervalidation/Designation";
const AddDesignation = ({handleSubmit, isEdit, updateDesignation}) => {
  const formik = useFormik({
    initialValues: {
      Designation_Name: isEdit !== null ? isEdit?.Designation_Name : null,
    },
    validationSchema: DesignationValidate,
    onSubmit: async (values) => {
      try {
        if (isEdit !== null) {
          updateDesignation(values);
          formik.resetForm();
        } else {
          handleSubmit(values);
          formik.resetForm();
        }
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

export default AddDesignation;
