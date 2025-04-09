import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  TablePagination,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import AddIcons from "@mui/icons-material/Add";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {
  createholidayapicall,
  fetchHolidaylistapicall,
  removeholidaylistapicall,
} from "../../../ApiServices/MasterApiServices/Holiday";
import toast from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const validationSchema = Yup.object({
  Name: Yup.string()
    .required("First Name is required")
    .min(2, "Name must be at least 2 characters"),
  date: Yup.date().required("Date is required").typeError("Invalid date"),
});

const Holiday = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isdata, setisdata] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // 0-indexed
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [IsEdit, setIsEdit] = useState(null);
  console.log(IsEdit, "isedit");
  const dispatch = useDispatch();

  const fetchholidaylistfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchHolidaylistapicall({
        params: {
          page: page + 1,
          limit,
          search,
        },
      });
      if (response.success) {
        setisdata(response.result);
        setTotal(response.totalItem);
        dispatch(setLoader(false));
      } else {
        setTotal(response.totalItem);
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.log(error?.message);
      dispatch(setLoader(false));
      setTotal(response.totalItem);
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: IsEdit !== null ? IsEdit?.Name : "",
      date: IsEdit !== null ? IsEdit.date.split("T")[0] : "", // format date
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const response = await createholidayapicall(values);
        if (response.success) {
          setIsOpen(false);
          toast.success(response?.message);
          formik.resetForm();
          fetchholidaylistfunc();
        } else {
          setIsOpen(false);
          fetchholidaylistfunc();
          formik.resetForm();
          toast.error(response?.message);
        }
        dispatch(setLoader(false));
        formik.resetForm();
      } catch (error) {
        setIsOpen(false);
        formik.resetForm();
        toast.error(error?.response?.data?.message);
      }
    },
  });

  // remove

  const handledelete = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removeholidaylistapicall(value);
      if (response?.success) {
        fetchholidaylistfunc();
        toast.success(response?.message);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setLoader(false));
    }
  };

  // handle Open
  const handlOpen = async (value) => {
    setIsOpen(true);
    setIsEdit(value);
  };

  useEffect(() => {
    fetchholidaylistfunc();
  }, [page, limit, search]);
  return (
    <Layout>
      <BreadCrumb pageName="Holiday" />
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
        Add Holiday
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
                Add Holiday
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <TextField
                      label="Name"
                      fullWidth
                      {...formik.getFieldProps("Name")}
                      error={formik.touched.Name && Boolean(formik.errors.Name)}
                      helperText={formik.touched.Name && formik.errors.Name}
                    />
                  </Grid>

                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{shrink: true}}
                      {...formik.getFieldProps("date")}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
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

      <TextField
        label="Search Holiday"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Holiday Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isdata.map((holiday, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>

                <TableCell>{holiday.Name}</TableCell>
                <TableCell>
                  {new Date(holiday.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DeleteOutlineIcon
                    sx={{color: "red"}}
                    onClick={() => handledelete(holiday.Holiday_Id)}
                  />
                  <EditOutlinedIcon
                    onClick={() => handlOpen(holiday)}
                    sx={{color: "blue"}}
                  />
                </TableCell>
              </TableRow>
            ))}
            {isdata.length === 0 && (
              <TableRow>
                <TableCell colSpan={30} align="center">
                  No Holidays Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[1, 5, 10, 25]}
      />
    </Layout>
  );
};

export default Holiday;
