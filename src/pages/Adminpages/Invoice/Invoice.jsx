import React, {useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import * as Yup from "yup";
import {
  Button,
  Container,
  Drawer,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import {useFormik} from "formik";
import AddIcon from "@mui/icons-material/Add";
import apiInstance from "../../../ApiInstance/apiInstance";
const validationSchema = Yup.object({
  clientId: Yup.string().required("Invoice clientId is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  rate: Yup.number().required("Rate is required"),
  percentage: Yup.number().required("Percentage is required"),
  term: Yup.string()
    .max(30, "Maximum 30 characters")
    .required("Term is required"),
});
const Invoice = () => {
  const [IsOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      clientId: "",
      startDate: "",
      endDate: "",
      rate: "",
      percentage: "",
      term: "",
    },
    // validationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      // you can replace this with your API call
      const formattedData = {
        ...values,
        startDate: moment(values.startDate).format("DD/MM/YYYY"),
        endDate: moment(values.endDate).format("DD/MM/YYYY"),
      };
      const response = await apiInstance.post(
        "/v1/admin/create-invoice",
        formattedData
      );
      console.log(response, "dtaF");
    },
  });
  return (
    <Layout>
      <BreadCrumb pageName="Invoice" />
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
        startIcon={<AddIcon />}
        onClick={() => setIsOpen(true)}
      >
        Create Invoice
      </Button>

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <Container maxWidth="md">
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6" sx={{mb: 2, mt: 2}}>
                Create Invoice
              </Typography>
              <Grid2 spacing={2} container>
                <Grid2 size={{sm: 12, xs: 12}}>
                  <TextField
                    label="Client ID"
                    type="text"
                    fullWidth
                    id="clientId"
                    name="clientId"
                    value={formik.values.clientId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.clientId && Boolean(formik.errors.clientId)
                    }
                    helperText={
                      formik.touched.clientId && formik.errors.clientId
                    }
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    id="startDate"
                    name="startDate"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    id="endDate"
                    name="endDate"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="Rate"
                    type="number"
                    fullWidth
                    id="rate"
                    name="rate"
                    value={formik.values.rate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rate && Boolean(formik.errors.rate)}
                    helperText={formik.touched.rate && formik.errors.rate}
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="Percentage"
                    type="number"
                    fullWidth
                    id="percentage"
                    name="percentage"
                    value={formik.values.percentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.percentage &&
                      Boolean(formik.errors.percentage)
                    }
                    helperText={
                      formik.touched.percentage && formik.errors.percentage
                    }
                  />
                </Grid2>
                <Grid2 size={{sm: 12, xs: 12}}>
                  <TextField
                    label="Term"
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    id="term"
                    name="term"
                    inputProps={{maxLength: 30}}
                    value={formik.values.term}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.term && Boolean(formik.errors.term)}
                    helperText={
                      formik.touched.term && formik.errors.term
                        ? formik.errors.term
                        : `${formik.values.term.length}/30`
                    }
                  />
                </Grid2>

                <Grid2 size={{sm: 12, xs: 12}}>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      background: "#2c3e50",
                      padding: "8px 10px",
                      margin: "10px 0px",
                      color: "white",
                    }}
                  >
                    Generate Invoice
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Container>
        </Drawer>
      )}
    </Layout>
  );
};

export default Invoice;
