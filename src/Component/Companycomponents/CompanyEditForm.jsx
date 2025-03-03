import React from "react";
import {useFormik} from "formik";
import {
  TextField,
  Button,
  Container,
  Box,
  Grid,
  Typography,
} from "@mui/material";

const CompanyEditForm = ({isEdit}) => {
  const formik = useFormik({
    initialValues: {
      Company_Name: isEdit?.Company_Name || "",
      Company_Email: isEdit?.Company_Email || "",
      Address: isEdit?.Address || "",
      Postal_Code: isEdit?.Postal_Code || "",
      Phone: isEdit?.Phone || "",
      Company_Logo: isEdit?.Company_Logo || "",
      Employee_No: isEdit?.Employee_No || "",
      Established_date: isEdit?.Established_date || "",
      CompanyWesite: isEdit?.CompanyWesite || "", // Fixed typo
      Tex_Number: isEdit?.Tex_Number || "", // Fixed key name
    },
    onSubmit: async (values) => {
      console.log(values, ">>>>>>>>");
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{p: 2}}>
        <Typography sx={{py: 3}}>Edit Company</Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Name"
                fullWidth
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Email"
                fullWidth
                {...formik.getFieldProps("Company_Email")}
                error={
                  formik.touched.Company_Email &&
                  Boolean(formik.errors.Company_Email)
                }
                helperText={
                  formik.touched.Company_Email && formik.errors.Company_Email
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                fullWidth
                {...formik.getFieldProps("Address")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Postal Code"
                fullWidth
                {...formik.getFieldProps("Postal_Code")}
                error={
                  formik.touched.Postal_Code &&
                  Boolean(formik.errors.Postal_Code)
                }
                helperText={
                  formik.touched.Postal_Code && formik.errors.Postal_Code
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                fullWidth
                type="number"
                {...formik.getFieldProps("Phone")}
                error={formik.touched.Phone && Boolean(formik.errors.Phone)}
                helperText={formik.touched.Phone && formik.errors.Phone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Logo"
                fullWidth
                inputProps={{type: "file"}} // Fixed file input handling
                onChange={(event) =>
                  formik.setFieldValue("Company_Logo", event.target.files[0])
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Employee Number"
                fullWidth
                type="number"
                {...formik.getFieldProps("Employee_No")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Established Date"
                fullWidth
                type="date"
                InputLabelProps={{shrink: true}}
                {...formik.getFieldProps("Established_date")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Website"
                fullWidth
                {...formik.getFieldProps("CompanyWesite")} // Fixed typo
                error={
                  formik.touched.CompanyWesite &&
                  Boolean(formik.errors.CompanyWesite)
                }
                helperText={
                  formik.touched.CompanyWesite && formik.errors.CompanyWesite
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tax Number"
                fullWidth
                {...formik.getFieldProps("Tex_Number")} // Fixed key name
                error={
                  formik.touched.Tex_Number && Boolean(formik.errors.Tex_Number)
                }
                helperText={
                  formik.touched.Tex_Number && formik.errors.Tex_Number
                }
              />
            </Grid>
            <Grid item xs={12}>
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
  );
};

export default CompanyEditForm;
