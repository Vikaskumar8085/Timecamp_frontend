import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import * as Yup from "yup";
import AddIcons from "@mui/icons-material/Add";
import {
  Button,
  Drawer,
  Typography,
  Grid,
  TextField,
  Container,
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {
  createcolorapicall,
  fetchcolorapicall,
  removecolorapicall,
} from "../../../ApiServices/MasterApiServices/Color";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// validate
const validationSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  min_percentage: Yup.number()
    .typeError("Minimum percentage must be a number")
    .required("Minimum percentage is required")
    .min(0, "Minimum must be at least 0"),
  max_percentage: Yup.number()
    .typeError("Maximum percentage must be a number")
    .required("Maximum percentage is required")
    .moreThan(
      Yup.ref("min_percentage"),
      "Maximum must be greater than Minimum"
    ),
});
// validate
const ColorPage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [IsData, setIsData] = useState([]);
  const dispatch = useDispatch();

  // fetch color

  const fetchcolorfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchcolorapicall();
      if (response?.success) {
        dispatch(setLoader(false));
        setIsData(response?.result);
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));

      toast.error(error?.response?.data?.message);
    }
  };

  // create color
  const formik = useFormik({
    initialValues: {
      Name: "",
      min_percentage: "",
      max_percentage: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const response = await createcolorapicall(values);
        if (response?.success) {
          dispatch(setLoader(false));
          toast.success(response?.message);
          setIsOpen(false);
          fetchcolorfunc();
          formik.resetForm();
        } else {
          setIsOpen(false);
          dispatch(setLoader(false));
          formik.resetForm();
          toast.error(response?.message);
          fetchcolorfunc();
        }
      } catch (error) {
        setIsOpen(false);
        dispatch(setLoader(false));
        fetchcolorfunc();
        formik.resetForm();
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleDelete = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removecolorapicall(value);
      if (response.success) {
        fetchcolorfunc();
        toast.success(response?.message);
        dispatch(setLoader(false));
      } else {
        fetchcolorfunc();
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));

      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchcolorfunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Color" />
      <Button
        onClick={() => setIsOpen(true)}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
        startIcon={<AddIcons />}
      >
        Add Colors
      </Button>

      {IsOpen && (
        <Drawer anchor="right" onClose={() => setIsOpen(false)} open={IsOpen}>
          <Container maxWidth="sm">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                p: 1,
              }}
            >
              <Typography
                variant="h6"
                component={"h1"}
                sx={{mb: 1, fontWeight: "bold", textTransform: "Capitalize"}}
              >
                Add Colors
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <TextField
                      label="Name"
                      type="color"
                      fullWidth
                      {...formik.getFieldProps("Name")}
                      error={formik.touched.Name && Boolean(formik.errors.Name)}
                      helperText={formik.touched.Name && formik.errors.Name}
                    />
                  </Grid>

                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <TextField
                      label="Min values"
                      type="number"
                      fullWidth
                      {...formik.getFieldProps("min_percentage")}
                      error={
                        formik.touched.min_percentage &&
                        Boolean(formik.errors.min_percentage)
                      }
                      helperText={
                        formik.touched.min_percentage &&
                        formik.errors.min_percentage
                      }
                    />
                  </Grid>
                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <TextField
                      label="Min values"
                      fullWidth
                      type="number"
                      {...formik.getFieldProps("max_percentage")}
                      error={
                        formik.touched.max_percentage &&
                        Boolean(formik.errors.max_percentage)
                      }
                      helperText={
                        formik.touched.max_percentage &&
                        formik.errors.max_percentage
                      }
                    />
                  </Grid>

                  <Grid sm={6} md={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        background: "#2c3e50",
                        width: "100%",
                        padding: "8px 10px",
                        margin: "10px 0px",
                        color: "white",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Drawer>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Color Name</TableCell>
              <TableCell>Min value</TableCell>
              <TableCell>Max value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsData?.length > 0
              ? IsData.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <TextField
                          disabled
                          type="color"
                          value={item?.Name}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>{item?.min_percentage}</TableCell>
                      <TableCell>{item?.max_percentage}</TableCell>
                      <TableCell>
                        <DeleteOutlineIcon
                          sx={{color: "red"}}
                          onClick={() => handleDelete(item.Color_Id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              : "Not Found"}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ColorPage;
