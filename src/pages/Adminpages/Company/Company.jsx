import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {TextField, Button, Container, Grid} from "@mui/material";
import "./company.scss";
import {
  createcompanyapicall,
  fetchcompanyapicall,
} from "../../../ApiServices/Companyapiservices";
import {useNavigate} from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const CompanyForm = ({handlesubmit}) => {
  const formik = useFormik({
    initialValues: {
      Company_Name: "",
      Company_Email: "",
      Address: "",
      Postal_Code: "",
      Phone: "",
      Company_Logo: "",
      Employee_No: "",
      Established_date: "",
      CompanyWesite: "",
      Tex_Number: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.Company_Name) {
        errors.Company_Name = "Company Name is required";
      }

      if (!values.Company_Email) {
        errors.Company_Email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.Company_Email)) {
        errors.Company_Email = "Email address is invalid";
      }

      if (!values.Postal_Code) {
        errors.Postal_Code = "Postal Code is required";
      }

      if (!values.Phone) {
        errors.Phone = "Phone number is required";
      } else if (values.Phone.toString().length !== 10) {
        errors.Phone = "Phone number must be 10 digits";
      }

      if (!values.CompanyWesite) {
        errors.CompanyWesite = "Company Website is required";
      } else if (!/^https?:\/\/\S+$/.test(values.CompanyWesite)) {
        errors.CompanyWesite = "Invalid URL format";
      }

      if (!values.Tex_Number) {
        errors.Tex_Number = "Tax Number is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      handlesubmit(values);
    },
  });

  return (
    <Container>
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
                formik.touched.Postal_Code && Boolean(formik.errors.Postal_Code)
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
              label="Company Logo URL"
              fullWidth
              {...formik.getFieldProps("Company_Logo")}
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
              {...formik.getFieldProps("CompanyWesite")}
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
              {...formik.getFieldProps("Tex_Number")}
              error={
                formik.touched.Tex_Number && Boolean(formik.errors.Tex_Number)
              }
              helperText={formik.touched.Tex_Number && formik.errors.Tex_Number}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const Company = () => {
  const navigate = useNavigate();
  const [iscompanydata, setIscompanydata] = useState({});
  console.log(iscompanydata.Company_Id);

  const getcompany = async () => {
    try {
      const response = await fetchcompanyapicall();
      if (response.success) {
        setIscompanydata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // create company
  const handlesubmit = async (value) => {
    try {
      const response = await createcompanyapicall(value);
      if (response.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getcompany();
  }, [0]);
  return iscompanydata.Company_Id > 0 ? (
    <DefaultLayout>
      <BreadCrumb pageName="Company" />
    </DefaultLayout>
  ) : (
    <>
      <div className="comapny_form">
        <CompanyForm handlesubmit={handlesubmit} />
      </div>
    </>
  );
};

export default Company;
