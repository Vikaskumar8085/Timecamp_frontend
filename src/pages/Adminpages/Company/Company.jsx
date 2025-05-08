import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {
  TextField,
  Button,
  Container,
  Grid,
  Drawer,
  Typography,
} from "@mui/material";
import "./company.scss";
import {
  createcompanyapicall,
  fetchcompanyapicall,
} from "../../../ApiServices/Companyapiservices";
import {useNavigate} from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign"
import CompanyTable from "../../../Component/Companycomponents/CompanyTable";
import CompanyEditForm from "../../../Component/Companycomponents/CompanyEditForm";
import toast from "react-hot-toast";

const CompanyForm = ({handlesubmit}) => {
  const formik = useFormik({
    initialValues: {
      Company_Name: "",
      Company_Email: "",
      Address: "",
      Postal_Code: "",
      Phone: "",
      Company_Logo: null,
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

      if (!values.Company_Logo) {
        errors.Company_Logo = "Company Logo is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);

      const formData = new FormData();

      formData.append("Company_Name", values?.Company_Name);
      formData.append("Company_Email", values?.Company_Email);
      formData.append("Address", values?.Address);
      formData.append("Postal_Code", values?.Postal_Code);
      formData.append("Phone", values?.Phone);
      formData.append("Employee_No", values?.Employee_No);
      formData.append("Established_date", values?.Established_date);
      formData.append("CompanyWesite", values?.CompanyWesite);
      formData.append("Tex_Number", values?.Tex_Number);

      if (values.Company_Logo) {
        formData.append("Company_Logo", values.Company_Logo); // File
      }

      console.log("Submitting FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1], "values");
      }

      handlesubmit(formData);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (validExtensions.includes(fileExtension)) {
        formik.setFieldValue("Company_Logo", file);
      } else {
        formik.setFieldError(
          "Company_Logo",
          "Only JPG, JPEG, and PNG files are allowed"
        );
      }
    }
  };

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
            <input
              accept="image/jpeg, image/png"
              type="file"
              onChange={handleFileChange}
              style={{display: "block", marginTop: "8px"}}
            />
            {formik.errors.Company_Logo && (
              <Typography color="error">
                {formik.errors.Company_Logo}
              </Typography>
            )}
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
  const [IsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(null);
  const [iscompanydata, setIscompanydata] = useState({});
  const [isId, setIsId] = useState(null);

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
        toast.success(response?.message);
        navigate("/dashboard");
      } else {
        navigate("/company");
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getcompany();
    // localStorage.setItem("company", parseInt(iscompanydata.Company_Id));
  }, [0]);
  return iscompanydata.Company_Id > 0 ? (
    <LayoutDesign>
      <BreadCrumb pageName="Company" />
      <CompanyTable
        setIsOpen={setIsOpen}
        setIsEdit={setIsEdit}
        company={iscompanydata}
        setIsId={setIsId}
      />

      {IsOpen && (
        <Drawer
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
            isEdit(false);
            isId = null;
          }}
          anchor="right"
        >
          <CompanyEditForm
            getcompany={getcompany}
            isId={isId}
            setIsOpen={setIsOpen}
            isEdit={isEdit}
          />
        </Drawer>
      )}
    </LayoutDesign>
  ) : (
    <>
      <div className="comapny_form">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          logout
        </button>
        <CompanyForm handlesubmit={handlesubmit} />
      </div>
    </>
  );
};

export default Company;
