import React, {useState} from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Container,
  Box,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useParams} from "react-router-dom";
import apiInstance from "../../../ApiInstance/apiInstance";

const ResetPassword = () => {
  const {resetToken} = useParams();

  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {password: ""},
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await apiInstance.put(
          `/v1/user/reset-password/${resetToken}`,
          values
        );
        console.log(response, "response");
      } catch (error) {}
    },
  });

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center"}}
        >
          <Typography variant="h5" gutterBottom>
            Password Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{mt: 2}}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default ResetPassword;
