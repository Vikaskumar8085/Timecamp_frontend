import React, {useState} from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useFormik} from "formik";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
const AdminForm = ({handleSubmit}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
        const {ConfirmPassword, ...formValues} = values; // Exclude ConfirmPassword before submission
        handleSubmit(formValues);

        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create image preview URL
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          p: 1,
        }}
      >
        <Typography variant="h5" sx={{margin: "10px 0px"}}>
          Add Admin
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item size={{sm: 12}}>
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

            {/* Last Name */}
            <Grid item size={{sm: 12}}>
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

            {/* Email */}
            <Grid item size={{sm: 12}}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...formik.getFieldProps("Email")}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
              />
            </Grid>

            {/* Password */}
            <Grid item size={{sm: 12}}>
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

            {/* Confirm Password */}
            <Grid item size={{sm: 12}}>
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

            {/* Image Upload */}
            <Grid item size={{sm: 12}} textAlign="center">
              <input
                accept="image/*"
                style={{display: "none"}}
                id="upload-image"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  sx={{mb: 2}}
                >
                  Choose Image
                </Button>
              </label>

              {preview && (
                <Box
                  mt={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Avatar src={preview} sx={{width: 120, height: 120, mb: 1}} />
                  <Typography variant="body2">{image?.name}</Typography>
                </Box>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item size={{sm: 12}}>
              <Button
                fullWidth
                variant="contained"
                sx={{bgcolor: "#2c3e50", color: "white"}}
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
// / const [image, setImage] = useState(null);
// const [preview, setPreview] = useState(null);

// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   }
// };

// const formik = useFormik({
//   initialValues: {
//     FirstName: "",
//     LastName: "",
//     Email: "",
//     Password: "",
//     ConfirmPassword: "",
//   },
//   validationSchema: Yup.object({
//     FirstName: Yup.string().required("First Name is required"),
//     LastName: Yup.string().required("Last Name is required"),
//     Email: Yup.string().email("Invalid email").required("Email is required"),
//     Password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
//     ConfirmPassword: Yup.string()
//       .oneOf([Yup.ref("Password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   }),
//   onSubmit: (values) => {
//     console.log("Form Submitted:", values);
//     console.log("Selected Image:", image);
//   },
// });
