import {Button, Box, Typography, TextField, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useFormik} from "formik";
import React from "react";
import AddIcons from "@mui/icons-material/Add";

const AddRoles = ({handleSubmit, isEdit, handleupdate}) => {
  const formik = useFormik({
    initialValues: {
      RoleName: isEdit !== null ? isEdit.RoleName : "",
    },
    onSubmit: async (values) => {
      try {
        if (isEdit !== null) {
          handleupdate(values);
        } else {
          handleSubmit(values);
        }
        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  return (
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
                id="Role_Name"
                name="RoleName"
                label="Role Name"
                variant="outlined"
                value={formik.values.RoleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.RoleName && Boolean(formik.errors.RoleName)
                }
                helperText={formik.touched.RoleName && formik.errors.RoleName}
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
  );
};

export default AddRoles;
