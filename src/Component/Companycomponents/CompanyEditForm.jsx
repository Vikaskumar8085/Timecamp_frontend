import React from "react";
import {useFormik} from "formik";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid2,
} from "@mui/material";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {useDispatch} from "react-redux";
import InputImageUpload from "../../common/InputImageUpload/InputImageUpload";
import Input from "../../common/Input/Input";

const CompanyEditForm = ({isEdit, isId, setIsOpen, getcompany}) => {
  const dispatch = useDispatch();
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
      try {
        dispatch(setLoader(true));
        const response = await apiInstance.put(
          `/v1/user/update-company/${isId}`,
          values
        );
        if (response?.data.success) {
          setIsOpen(false);
          dispatch(setLoader(false));
          getcompany();
          toast.success(response?.data?.message);
        } else {
          dispatch(setLoader(false));
          getcompany();
          setIsOpen(false);
          toast.error(response?.data?.message);
        }
      } catch (error) {
        dispatch(setLoader(false));
        getcompany();
        setIsOpen(false);
        toast.error(response?.data?.message);
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{p: 2}}>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 size={{md: 12, lg: 12, sm: 12}}>
              <InputImageUpload
                name="Edit Company Logo"
                value={formik.values.Company_Logo}
                onChange={formik.setFieldValue}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Company Name"
                placeholder={"Please enter Company Name"}
                {...formik.getFieldProps("Company_Name")}
                error={
                  formik.touched.Company_Name &&
                  Boolean(formik.errors.Company_Name)
                }
                helperText={
                  formik.touched.Company_Name && formik.errors.Company_Name
                }
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Company Email"
                placeholder="Please Enter Address"
                {...formik.getFieldProps("Company_Email")}
                error={
                  formik.touched.Company_Email &&
                  Boolean(formik.errors.Company_Email)
                }
                helperText={
                  formik.touched.Company_Email && formik.errors.Company_Email
                }
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Address"
                placeholder="Please Enter Address"
                {...formik.getFieldProps("Address")}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Postal Code"
                placeholder={"Please Enter Your Postal Code"}
                {...formik.getFieldProps("Postal_Code")}
                error={
                  formik.touched.Postal_Code &&
                  Boolean(formik.errors.Postal_Code)
                }
                helperText={
                  formik.touched.Postal_Code && formik.errors.Postal_Code
                }
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Phone"
                placeholder={"Please Enter Your Phone"}
                type="number"
                {...formik.getFieldProps("Phone")}
                error={formik.touched.Phone && Boolean(formik.errors.Phone)}
                helperText={formik.touched.Phone && formik.errors.Phone}
              />
            </Grid2>

            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Employee Number"
                placeholder={"Please Enter Your Employee Number"}
                type="number"
                {...formik.getFieldProps("Employee_No")}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Established Date"
                type="date"
                {...formik.getFieldProps("Established_date")}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Company Website"
                placeholder="Please Enter Your Company webiste link"
                {...formik.getFieldProps("CompanyWesite")} // Fixed typo
                error={
                  formik.touched.CompanyWesite &&
                  Boolean(formik.errors.CompanyWesite)
                }
                helperText={
                  formik.touched.CompanyWesite && formik.errors.CompanyWesite
                }
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <Input
                labelText="Tax Number"
                placeholder={"Please Enter your Tax Number"}
                {...formik.getFieldProps("Tex_Number")} // Fixed key name
                error={
                  formik.touched.Tex_Number && Boolean(formik.errors.Tex_Number)
                }
                helperText={
                  formik.touched.Tex_Number && formik.errors.Tex_Number
                }
              />
            </Grid2>
            <Grid2 size={{md: 12, lg: 12, sm: 12}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
};

export default CompanyEditForm;
