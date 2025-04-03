import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Button,
  Container,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  fetchemployeeactiveprojectapicall,
  fetchemployeeprojecttimesheetapicall,
  fillemployeetimesheetapicall,
} from "../../../ApiServices/EmployeeApiservices/Employee";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../../ApiInstance/apiInstance";
import {useDispatch} from "react-redux";

const EmployeeProjectTimesheet = ({id}) => {
  const [IsEmployeeProjectTimesheetdata, setIsEmployeeProjectTimesheetdata] =
    useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const [Isemployeeprojects, setIsemployeeprojects] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);

  // heandlecheckBox
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };
  // handlechcekbox

  const fetchemployeeactiveproject = async () => {
    try {
      const response = await fetchemployeeactiveprojectapicall();
      if (response.success) {
        setIsemployeeprojects(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchEmployeeProjectTimesheet = async () => {
    try {
      const response = await fetchemployeeprojecttimesheetapicall(id);
      if (response.success) {
        setIsEmployeeProjectTimesheetdata(response?.result || []);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Staff_Id: id,
      hours: "",
      project: "",
      day: "",
      Description: "",
      task_description: "",
      attachement: null,
    },
    validationSchema: Yup.object({
      hours: Yup.string().required("Hours are required"),
      project: Yup.string().required("Project ID is required"),
      day: Yup.string().required("Day is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task description is required"),
      attachement: Yup.mixed().required("Attachment is required"),
    }),
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("Staff_Id", values.Staff_Id);
      formdata.append("hours", values.hours);
      formdata.append("project", values.project);
      formdata.append("day", values.day);
      formdata.append("Description", values.Description);
      formdata.append("task_description", values.task_description);
      formdata.append("file", values.attachement);
      try {
        const response = await fillemployeetimesheetapicall(formdata);
        if (response.success) {
          setIsOpen(false);
          formik.resetForm();
          fetchEmployeeProjectTimesheet();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  // remove timesheet

  const RemoveTimesheetFunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.delete(
        `/v2/employee/remove-employee-timesheet/${value}`
      );
      if (response.data?.success) {
        dispatch(setLoader(false));
        fetchEmployeeProjectTimesheet();
      } else {
      }
    } catch (error) {}
  };

  const SendForApprovel = async () => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.put(
        `/v2/employee/send-for-approvel/${id}`,
        selectedItems
      );
      fetchEmployeeProjectTimesheet();
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response.data?.message);
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchEmployeeProjectTimesheet();
    fetchemployeeactiveproject();
  }, [0]);
  return (
    <>
      <BreadCrumb pageName="Employee Project Timesheet" />
      <Button
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Fill Timesheet
      </Button>

      {selectedItems.length > 0 ? (
        <Button
          onClick={() => SendForApprovel()}
          sx={{
            background: "#31bb62",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Send For Approved
        </Button>
      ) : null}

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <Container maxWidth="sm" sx={{p: 2}}>
            <Typography variant="h5" sx={{mb: 3}}>
              Fill timesheet
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel>Select Project</InputLabel>
                <Select
                  {...formik.getFieldProps("project")}
                  value={formik.values.project}
                  onChange={formik.handleChange}
                >
                  {[
                    ...(Isemployeeprojects?.response || []),
                    ...(Isemployeeprojects?.employeeactiveProjects || []),
                  ].map((item) => (
                    <MenuItem key={item.ProjectId} value={item.ProjectId}>
                      {item.Project_Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Hours"
                name="hours"
                value={formik.values.hours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.hours && Boolean(formik.errors.hours)}
                helperText={formik.touched.hours && formik.errors.hours}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Day"
                name="day"
                type="date"
                InputLabelProps={{shrink: true}}
                value={formik.values.day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.day && Boolean(formik.errors.day)}
                helperText={formik.touched.day && formik.errors.day}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Description"
                name="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Description &&
                  Boolean(formik.errors.Description)
                }
                helperText={
                  formik.touched.Description && formik.errors.Description
                }
                margin="normal"
              />

              <TextField
                fullWidth
                label="Task Description"
                name="task_description"
                value={formik.values.task_description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.task_description &&
                  Boolean(formik.errors.task_description)
                }
                helperText={
                  formik.touched.task_description &&
                  formik.errors.task_description
                }
                margin="normal"
              />

              <input
                type="file"
                name="attachement"
                onChange={(event) =>
                  formik.setFieldValue(
                    "attachement",
                    event.currentTarget.files[0]
                  )
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.attachement && formik.errors.attachement && (
                <div style={{color: "red"}}>{formik.errors.attachement}</div>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{marginTop: "15px"}}
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Container>
        </Drawer>
      )}

      <TableContainer component={Paper} sx={{maxHeight: 500}}>
        <Typography variant="h6" sx={{m: 2}}>
          Employee Timesheet
        </Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Select id</TableCell>

              <TableCell>Timesheet Code</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Billing Status</TableCell>
              <TableCell>Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsEmployeeProjectTimesheetdata?.flatMap((item) =>
              item.findtimesheet.map((rowdata) => (
                <TableRow key={rowdata._id}>
                  <TableCell>
                    <FormControlLabel
                      key={rowdata.Timesheet_Id}
                      control={
                        <Checkbox
                          checked={selectedItems.includes(rowdata.Timesheet_Id)}
                          onChange={() =>
                            handleCheckboxChange(rowdata.Timesheet_Id)
                          }
                        />
                      }
                      label={rowdata.name}
                    />
                  </TableCell>
                  <TableCell>{rowdata.ts_code}</TableCell>
                  <TableCell>{rowdata.hours}</TableCell>
                  <TableCell>{rowdata.Description}</TableCell>
                  <TableCell>{rowdata.task_description}</TableCell>
                  <TableCell>{rowdata.remarks}</TableCell>
                  <TableCell>{rowdata.approval_status}</TableCell>
                  <TableCell>{rowdata.billing_status}</TableCell>
                  <TableCell>{rowdata.day}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => RemoveTimesheetFunc(rowdata?.Timesheet_Id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeProjectTimesheet;
