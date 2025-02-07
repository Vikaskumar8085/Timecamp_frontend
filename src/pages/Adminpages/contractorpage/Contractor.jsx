import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import {
  addContractorapicall,
  fetchcontractorapicall,
} from "../../../ApiServices/AdminApiServices/Contractor";
import { Link } from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";


const Contractor = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [Iscontractordata, setIscontractordata] = useState([]);

  const getcontractor = async () => {
    try {
      const response = await fetchcontractorapicall();
      console.log(response);
      if (response.success) {
        setIscontractordata(response.result);
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
        const response = await addContractorapicall(value);
        if (response.success) {
          setIsModalOpen(false);
          getcontractor();
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  React.useEffect(() => {
    getcontractor();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Contractor" />

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
          Add Contractor
        </Button>

      {
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Add Contractor"}
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

      {/* table of contractor */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Contractor FirstName</TableCell>
              <TableCell align="left">Contractor LastName</TableCell>
              <TableCell align="left">Contractor Email</TableCell>
              <TableCell align="left">Contractor Phone</TableCell>
              <TableCell align="left">Contractor Address</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Iscontractordata.length > 0
              ? Iscontractordata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{item.FirstName}</TableCell>
                    <TableCell align="left">{item.LastName}</TableCell>
                    <TableCell align="left">{item.Email}</TableCell>
                    <TableCell align="left">{item.Phone}</TableCell>
                    <TableCell align="left">{item.Address}</TableCell>
                    <TableCell align="left">
                      <Link to={`/contractor-info/${item.staff_Id}`}>View</Link>
                    </TableCell>
                  </TableRow>
                ))
              : "null"}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Contractor;
