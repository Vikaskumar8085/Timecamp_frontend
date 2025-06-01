import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Box,
  TablePagination,
} from "@mui/material";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import {
  fetchcontractorprojectinformationapicall,
  fillcontractorprojecttimesheetapicall,
} from "../../../ApiServices/ContractorApiServices/ContractorApiServices";
import apiInstance from "../../../ApiInstance/apiInstance";
import moment from "moment";

const validationSchema = Yup.object().shape({
  entries: Yup.array().of(
    Yup.object().shape({
      project: Yup.string().required("Project is required"),
      hours: Yup.number()
        .typeError("Must be a number")
        .required("Hours are required"),
      day: Yup.date().required("Date is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task Description is required"),
      attachement: Yup.mixed(),
    })
  ),
});

const ContractorProjectTimesheet = ({ id }) => {
  const [isContractoractiveproject, setIsContractoractiveproject] = useState(
    []
  );

  const [isprojectinfodata, setIsprojectInfodata] = useState([]);
  console.log(isContractoractiveproject, "dadsf");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // TablePagination uses zero-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectid, setProjectid] = useState(null);

  const fetchcontractorprojecttimesheetFunc = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get(
        `/v2/contractor/fetch-contractor-timesheet/${id}`,
        {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            search: search.trim()
              ? {
                  $or: [
                    { task_description: { $regex: search, $options: "i" } },
                    { task_Name: { $regex: search, $options: "i" } },
                  ],
                }
              : undefined,
          },
        }
      );

      if (response.data.success) {
        setIsContractoractiveproject(response.data.result);
        setTotalRecords(response.data.totalRecords);
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

  console.log(isprojectinfodata, "fasldkfslkd");
  const fetchcontractorprojectinfofunc = async () => {
    try {
      const response = await fetchcontractorprojectinformationapicall(id);
      if (response.success) {
        setIsprojectInfodata(response.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const formik = useFormik({
    initialValues: {
      entries: [
        {
          project: "",
          hours: "",
          day: "",
          Description: "",
          task_description: "",
          attachement: null,
        },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values, "values");

      // formdata.append("Staff_Id", values.Staff_Id);
      // formdata.append("hours", values.hours);
      // formdata.append("project", values.project);
      // formdata.append("day", values.day);
      // formdata.append("Description", values.Description);
      // formdata.append("task_description", values.task_description);
      // formdata.append("file", values.attachement);
      // console.log("Form Data:", formdata);
      values.entries.forEach((entry, index) => {
        for (let key in entry) {
          if (key === "attachment" && entry.attachment) {
            formData.append(`entries[${index}][${key}]`, entry.attachement);
          } else {
            formData.append(`entries[${index}][${key}]`, entry[key]);
          }
        }
      });
      try {
        const response = await apiInstance.post(
          "/v2/contractor/contractor-v1-fill-timesheet",
          formData
        );
        console.log(response, "?....................?");
        if (response.data.success) {
          setIsOpen(false);
        }

        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  const handleCheckboxChange = (timesheetId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(timesheetId)) {
        return prevSelected.filter((id) => id !== timesheetId);
      }
      return [...prevSelected, timesheetId];
    });
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allIds = isContractoractiveproject.map((item) => item.Timesheet_Id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const isAllSelected =
    isContractoractiveproject?.length > 0 &&
    selectedItems.length === isContractoractiveproject.length;

  useEffect(() => {
    fetchcontractorprojecttimesheetFunc();
    fetchcontractorprojectinfofunc();
  }, [page, rowsPerPage, search]);
  return (
    <>
      <BreadCrumb pageName="Contractor Project Timesheet" />

      <Button
        onClick={() => setIsOpen(true)}
        // startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Fill Timesheet
      </Button>
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); // Reset to first page when searching
        }}
      />

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <Container maxWidth="sm" sx={{ p: 2 }}>
            <form onSubmit={formik.handleSubmit}>
              {formik.values.entries.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Select Project</InputLabel>
                    <Select
                      name={`entries[${index}].project`}
                      value={entry.project}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.entries?.[index]?.project &&
                        Boolean(formik.errors.entries?.[index]?.project)
                      }
                    >
                      {isprojectinfodata.map((item) => (
                        <MenuItem key={item.ProjectId} value={item.ProjectId}>
                          {item.Project_Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Hours"
                    name={`entries[${index}].hours`}
                    value={entry.hours}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.entries?.[index]?.hours &&
                      Boolean(formik.errors.entries?.[index]?.hours)
                    }
                    helperText={
                      formik.touched.entries?.[index]?.hours &&
                      formik.errors.entries?.[index]?.hours
                    }
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Day"
                    name={`entries[${index}].day`}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={entry.day}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.entries?.[index]?.day &&
                      Boolean(formik.errors.entries?.[index]?.day)
                    }
                    helperText={
                      formik.touched.entries?.[index]?.day &&
                      formik.errors.entries?.[index]?.day
                    }
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    name={`entries[${index}].Description`}
                    value={entry.Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.entries?.[index]?.Description &&
                      Boolean(formik.errors.entries?.[index]?.Description)
                    }
                    helperText={
                      formik.touched.entries?.[index]?.Description &&
                      formik.errors.entries?.[index]?.Description
                    }
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Task Description"
                    name={`entries[${index}].task_description`}
                    value={entry.task_description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.entries?.[index]?.task_description &&
                      Boolean(formik.errors.entries?.[index]?.task_description)
                    }
                    helperText={
                      formik.touched.entries?.[index]?.task_description &&
                      formik.errors.entries?.[index]?.task_description
                    }
                    margin="normal"
                  />

                  <input
                    type="file"
                    name={`entries[${index}].attachement`}
                    onChange={(event) =>
                      formik.setFieldValue(
                        `entries[${index}].attachement`,
                        event.currentTarget.files[0]
                      )
                    }
                    onBlur={formik.handleBlur}
                    style={{ marginTop: "10px" }}
                  />
                  {formik.touched.entries?.[index]?.attachement &&
                    formik.errors.entries?.[index]?.attachement && (
                      <div style={{ color: "red" }}>
                        {formik.errors.entries[index].attachement}
                      </div>
                    )}

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const updated = [...formik.values.entries];
                      updated.splice(index, 1);
                      formik.setFieldValue("entries", updated);
                    }}
                    sx={{ mt: 2 }}
                    disabled={formik.values.entries.length === 1}
                  >
                    Remove
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  formik.setFieldValue("entries", [
                    ...formik.values.entries,
                    {
                      project: "",
                      hours: "",
                      day: "",
                      Description: "",
                      task_description: "",
                      attachement: null,
                    },
                  ])
                }
                sx={{ mb: 2 }}
              >
                Add Entry
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Container>
        </Drawer>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAllSelected}
                        onChange={handleSelectAllChange}
                        indeterminate={
                          selectedItems.length > 0 &&
                          selectedItems.length <
                            isContractoractiveproject?.length
                        }
                      />
                    }
                    label="sr.No"
                  />
                  ;
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Timesheet No.</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Total Hours</TableCell>
                <TableCell>Billed Hours</TableCell>
                <TableCell>Ok Hours</TableCell>
                <TableCell>Blank Hours</TableCell>
                <TableCell>Approval Status</TableCell>
                <TableCell>Billing Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Attachement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isContractoractiveproject.length > 0 ? (
                isContractoractiveproject.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FormControlLabel
                        key={item.Timesheet_Id}
                        control={
                          <Checkbox
                            checked={selectedItems.includes(item.Timesheet_Id)}
                            onChange={() => {
                              handleCheckboxChange(item.Timesheet_Id);
                              setProjectid(item.project);
                            }}
                          />
                        }
                        label={item.name}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.ts_code}</TableCell>
                    <TableCell>
                      {moment(item.created_at).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{item.ProjectName || null}</TableCell>
                    <TableCell>{item.StaffName || null}</TableCell>
                    <TableCell>{item.Description || null}</TableCell>
                    <TableCell>{item.hours || null}</TableCell>
                    <TableCell>{item?.billed_hours || null}</TableCell>
                    <TableCell>{item.ok_hours || null}</TableCell>
                    <TableCell>{item.blank_hours}</TableCell>
                    <TableCell>{item.approval_status}</TableCell>
                    <TableCell>{item.billing_status}</TableCell>
                    <TableCell>{item.remarks}</TableCell>
                    <TableCell>
                      {item.attachement ? (
                        <a
                          href={`${item.attachement}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        <span>No Attachment</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No timesheets found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset to first page when changing rows per page
        }}
      />
    </>
  );
};

export default ContractorProjectTimesheet;
