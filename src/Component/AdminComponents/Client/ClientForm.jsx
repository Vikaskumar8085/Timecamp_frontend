import React from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useFormik} from "formik";

const ClientForm = ({handleSubmit, isEdit, handleUpdate}) => {
  const validate = (values) => {
    const errors = {};
    if (!values.Company_Name.trim()) {
      errors.Company_Name = "Company Name is required";
    } else if (values.Company_Name.length < 3) {
      errors.Company_Name = "Company Name must be at least 3 characters long";
    }

    if (!values.Client_Name.trim()) {
      errors.Client_Name = "Client Name is required";
    } else if (values.Client_Name.length < 3) {
      errors.Client_Name = "Client Name must be at least 3 characters long";
    }

    if (!values.Client_Email) {
      errors.Client_Email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Client_Email)
    ) {
      errors.Client_Email = "Invalid email address";
    }

    if (!values.Client_Phone) {
      errors.Client_Phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.Client_Phone)) {
      errors.Client_Phone = "Phone number must be exactly 10 digits";
    }

    if (!values.Client_Address.trim()) {
      errors.Client_Address = "Address is required";
    }

    if (!values.Client_Postal_Code) {
      errors.Client_Postal_Code = "Postal Code is required";
    } else if (!/^[0-9]{5,6}$/.test(values.Client_Postal_Code)) {
      errors.Client_Postal_Code = "Postal Code must be 5 or 6 digits";
    }

    // if (!values.GstNumber.trim()) {
    //   errors.GstNumber = "GST Number is required";
    // }
    //  else if (
    //   !/^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
    //     values.GstNumber
    //   )
    // ) {
    //   errors.GstNumber = "Invalid GST Number format";
    // }
    // if (!values.System_Access) {
    // errors.System_Access = "System Access is required";
    // }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      Company_Name: isEdit !== null ? isEdit?.Company_Name : "",
      Client_Name: isEdit !== null ? isEdit.Client_Name : "",
      Client_Email: isEdit !== null ? isEdit.Client_Email : "",
      Client_Phone: isEdit !== null ? isEdit.Client_Phone : "",
      Client_Address: isEdit !== null ? isEdit.Client_Address : "",
      Client_Postal_Code: isEdit !== null ? isEdit.Client_Postal_Code : "",
      Password: isEdit !== null ? "" : "",
      GstNumber: isEdit !== null ? isEdit.GstNumber : "",
      System_Access: isEdit !== null ? isEdit.System_Access : false,
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (isEdit !== null) {
        handleUpdate(values);
        formik.resetForm();
      } else {
        handleSubmit(values);
        formik.resetForm();
      }

      // console.log(values,'akdfalskd')
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 1,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Company Name"
                {...formik.getFieldProps("Company_Name")}
                error={
                  formik.touched.Company_Name &&
                  Boolean(formik.errors.Company_Name)
                }
                helperText={
                  formik.touched.Company_Name && formik.errors.Company_Name
                }
              />
            </Grid>
            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Client Name"
                {...formik.getFieldProps("Client_Name")}
                error={
                  formik.touched.Client_Name &&
                  Boolean(formik.errors.Client_Name)
                }
                helperText={
                  formik.touched.Client_Name && formik.errors.Client_Name
                }
              />
            </Grid>
            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Client Email"
                type="email"
                {...formik.getFieldProps("Client_Email")}
                error={
                  formik.touched.Client_Email &&
                  Boolean(formik.errors.Client_Email)
                }
                helperText={
                  formik.touched.Client_Email && formik.errors.Client_Email
                }
              />
            </Grid>
            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Client Phone"
                type="tel"
                {...formik.getFieldProps("Client_Phone")}
                error={
                  formik.touched.Client_Phone &&
                  Boolean(formik.errors.Client_Phone)
                }
                helperText={
                  formik.touched.Client_Phone && formik.errors.Client_Phone
                }
              />
            </Grid>

            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Password"
                {...formik.getFieldProps("Password")}
                error={
                  formik.touched.Password && Boolean(formik.errors.Password)
                }
                helperText={formik.touched.Password && formik.errors.Password}
              />
            </Grid>

            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Client Address"
                {...formik.getFieldProps("Client_Address")}
                error={
                  formik.touched.Client_Address &&
                  Boolean(formik.errors.Client_Address)
                }
                helperText={
                  formik.touched.Client_Address && formik.errors.Client_Address
                }
              />
            </Grid>
            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="Client Postal Code"
                type="number"
                {...formik.getFieldProps("Client_Postal_Code")}
                error={
                  formik.touched.Client_Postal_Code &&
                  Boolean(formik.errors.Client_Postal_Code)
                }
                helperText={
                  formik.touched.Client_Postal_Code &&
                  formik.errors.Client_Postal_Code
                }
              />
            </Grid>
            <Grid size={{sm: 6}}>
              <TextField
                fullWidth
                label="GST Number"
                {...formik.getFieldProps("GstNumber")}
                error={
                  formik.touched.GstNumber && Boolean(formik.errors.GstNumber)
                }
                helperText={formik.touched.GstNumber && formik.errors.GstNumber}
              />
            </Grid>
            <Grid size={{sm: 6}}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="System_Access"
                    color="primary"
                    checked={formik.values.System_Access}
                    onChange={formik.handleChange}
                    onBlur={() => setTouched(true)}
                  />
                }
                label="System Access"
              />
            </Grid>

            <Grid size={{sm: 12}}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  color: "white",
                  width: "100%",
                }}
              >
                Register Client
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ClientForm;
