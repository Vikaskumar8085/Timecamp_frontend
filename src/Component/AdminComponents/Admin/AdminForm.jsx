import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Avatar,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import {useFormik} from "formik";

const AdminForm = () => {
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
      const {ConfirmPassword, ...formValues} = values; // Exclude ConfirmPassword before submission
      alert(JSON.stringify(formValues, null, 2));
    },
  });

  return (
    <Container maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              {...formik.getFieldProps("LastName")}
              error={formik.touched.LastName && Boolean(formik.errors.LastName)}
              helperText={formik.touched.LastName && formik.errors.LastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...formik.getFieldProps("Email")}
              error={formik.touched.Email && Boolean(formik.errors.Email)}
              helperText={formik.touched.Email && formik.errors.Email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...formik.getFieldProps("Password")}
              error={formik.touched.Password && Boolean(formik.errors.Password)}
              helperText={formik.touched.Password && formik.errors.Password}
            />
          </Grid>
          <Grid item xs={12}>
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
                formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AdminForm;
