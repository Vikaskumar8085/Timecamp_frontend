import React from "react";
import {TextField, Button, Container, Box} from "@mui/material";
import {useFormik} from "formik";

const ClientForm = ({handleSubmit}) => {
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

    if (!values.GstNumber.trim()) {
      errors.GstNumber = "GST Number is required";
    } else if (!/^GST[0-9]{6,10}$/.test(values.GstNumber)) {
      errors.GstNumber = "Invalid GST Number format";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      Company_Name: "",
      Client_Name: "",
      Client_Email: "",
      Client_Phone: "",
      Client_Address: "",
      Client_Postal_Code: "",
      GstNumber: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleSubmit(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            label="Company Name"
            {...formik.getFieldProps("Company_Name")}
            error={
              formik.touched.Company_Name && Boolean(formik.errors.Company_Name)
            }
            helperText={
              formik.touched.Company_Name && formik.errors.Company_Name
            }
          />
          <TextField
            fullWidth
            label="Client Name"
            {...formik.getFieldProps("Client_Name")}
            error={
              formik.touched.Client_Name && Boolean(formik.errors.Client_Name)
            }
            helperText={formik.touched.Client_Name && formik.errors.Client_Name}
          />
          <TextField
            fullWidth
            label="Client Email"
            type="email"
            {...formik.getFieldProps("Client_Email")}
            error={
              formik.touched.Client_Email && Boolean(formik.errors.Client_Email)
            }
            helperText={
              formik.touched.Client_Email && formik.errors.Client_Email
            }
          />
          <TextField
            fullWidth
            label="Client Phone"
            type="tel"
            {...formik.getFieldProps("Client_Phone")}
            error={
              formik.touched.Client_Phone && Boolean(formik.errors.Client_Phone)
            }
            helperText={
              formik.touched.Client_Phone && formik.errors.Client_Phone
            }
          />
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
          <TextField
            fullWidth
            label="GST Number"
            {...formik.getFieldProps("GstNumber")}
            error={formik.touched.GstNumber && Boolean(formik.errors.GstNumber)}
            helperText={formik.touched.GstNumber && formik.errors.GstNumber}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Register Client
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ClientForm;
