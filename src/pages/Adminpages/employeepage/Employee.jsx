import React, { useState } from "react";
import { Drawer, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import { Button } from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import {
  addemployeeapicall,
  fetchemployeeapicall,
} from "../../../ApiServices/AdminApiServices/Employee";
import EmployeeTable from "../../../Component/AdminComponents/Employee/EmployeeTable";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContractorUploadForm from "../../../Component/AdminComponents/Contractor/ContractorUploadForm";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [IsEmployeeData, setIsEmployeeData] = useState([]);

  const getemployee = async () => {
    try {
      const response = await fetchemployeeapicall();
      if (response.success) {
        setIsEmployeeData(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Address: "",
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("First Name is required"),
      LastName: Yup.string().required("Last Name is required"),
      Email: Yup.string().email("Invalid email").required("Email is required"),
      Phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      Address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (value) => {
      try {
        const response = await addemployeeapicall(value);
        console.log(response, "response data");
        if (response.success) {
          getemployee();
          setIsModalOpen(false);
        }

        console.log(value, "values");
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  React.useEffect(() => {
    getemployee();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Employee" />

      <Button
        onClick={() => setIsModalOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Add Employee
      </Button>
      <Button
        onClick={() => setIsUpload(true)}
        startIcon={<FileUploadIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Upload Employee
      </Button>

      {
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Add Employee"}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="FirstName"
              value={formik.values.FirstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.FirstName && Boolean(formik.errors.FirstName)
              }
              helperText={formik.touched.FirstName && formik.errors.FirstName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="LastName"
              value={formik.values.LastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.LastName && Boolean(formik.errors.LastName)}
              helperText={formik.touched.LastName && formik.errors.LastName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="Email"
              type="email"
              value={formik.values.Email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Email && Boolean(formik.errors.Email)}
              helperText={formik.touched.Email && formik.errors.Email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="Phone"
              value={formik.values.Phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Phone && Boolean(formik.errors.Phone)}
              helperText={formik.touched.Phone && formik.errors.Phone}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="Address"
              value={formik.values.Address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Address && Boolean(formik.errors.Address)}
              helperText={formik.touched.Address && formik.errors.Address}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </TModal>
      }

      {isUpload && (
        <Drawer
          open={isUpload}
          onClose={() => setIsUpload(false)}
          anchor="right"
        >
          <ContractorUploadForm />
        </Drawer>
      )}

      <EmployeeTable IsEmployeeData={IsEmployeeData} />
    </Layout>
  );
};

export default Employee;
