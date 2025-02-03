import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Avatar,
  Container,
  Typography,
} from "@mui/material";
import {useFormik} from "formik";
import {signupapicall} from "../../ApiServices/Authapiservices";

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
  if (!values.Term) {
    errors.Term = "You must accept the terms";
  }
  return errors;
};

const Signup = () => {
  // at us.
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      Photo: "https://i.ibb.co/4pDNDk1/avatar.png",
      Term: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await signupapicall(values);
        if (response.success) {
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error?.response?.message, "message");
      }
    },
  });

  function redirectfunc() {
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }

  useEffect(() => {
    redirectfunc();
  }, [0]);
  return (
    <>
      <div className="Signup_wrapper">
        <Container maxWidth="xs">
          <Typography variant="h5" align="center" gutterBottom>
            signup
          </Typography>
          <Avatar
            src={formik.values.Photo}
            sx={{width: 80, height: 80, margin: "auto"}}
          />
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                {...formik.getFieldProps("FirstName")}
                error={
                  formik.touched.FirstName && Boolean(formik.errors.FirstName)
                }
                helperText={formik.touched.FirstName && formik.errors.FirstName}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                {...formik.getFieldProps("LastName")}
                error={
                  formik.touched.LastName && Boolean(formik.errors.LastName)
                }
                helperText={formik.touched.LastName && formik.errors.LastName}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                {...formik.getFieldProps("Email")}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                {...formik.getFieldProps("Password")}
                error={
                  formik.touched.Password && Boolean(formik.errors.Password)
                }
                helperText={formik.touched.Password && formik.errors.Password}
              />
            </div>
            <div className="mb-3">
              <FormControlLabel
                control={
                  <Checkbox
                    {...formik.getFieldProps("Term")}
                    checked={formik.values.Term}
                  />
                }
                label="I accept the terms and conditions"
              />
              {formik.touched.Term && formik.errors.Term && (
                <Typography color="error" variant="body2">
                  {formik.errors.Term}
                </Typography>
              )}
            </div>
            <div className="mb-3">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{mt: 2}}
              >
                Register
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Signup;
