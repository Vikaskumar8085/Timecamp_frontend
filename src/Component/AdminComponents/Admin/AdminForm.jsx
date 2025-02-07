import React from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";

const AdminForm = ({ handleSubmit }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.FirstName.trim()) {
      errors.FirstName = "First Name is required";
    }
    if (!values.LastName.trim()) {
      errors.LastName = "Last Name is required";
    }
    if (!values.Email) {
      errors.Email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)) {
      errors.Email = "Invalid email address";
    }
    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 6) {
      errors.Password = "Password must be at least 6 characters long";
    }
    if (!values.ConfirmPassword) {
      errors.ConfirmPassword = "Confirm Password is required";
    } else if (values.ConfirmPassword !== values.Password) {
      errors.ConfirmPassword = "Passwords must match";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      try {
        const { ConfirmPassword, ...formValues } = values; // Exclude ConfirmPassword before submission
        handleSubmit(formValues);

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
          mt: 2,
          p: 1,
        }}
      >
        <Typography variant="h5" sx={{ margin: "10px 0px" }}>
          Add Admin
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="First Name"
                {...formik.getFieldProps("FirstName")}
                error={
                  formik.touched.FirstName && Boolean(formik.errors.FirstName)
                }
                helperText={formik.touched.FirstName && formik.errors.FirstName}
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="Last Name"
                {...formik.getFieldProps("LastName")}
                error={
                  formik.touched.LastName && Boolean(formik.errors.LastName)
                }
                helperText={formik.touched.LastName && formik.errors.LastName}
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...formik.getFieldProps("Email")}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...formik.getFieldProps("Password")}
                error={
                  formik.touched.Password && Boolean(formik.errors.Password)
                }
                helperText={formik.touched.Password && formik.errors.Password}
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...formik.getFieldProps("ConfirmPassword")}
                error={
                  formik.touched.ConfirmPassword &&
                  Boolean(formik.errors.ConfirmPassword)
                }
                helperText={
                  formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword
                }
              />
            </Grid>
            <Grid size={{ sm: 12 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  color: "white",
                }}
                type="submit"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AdminForm;
