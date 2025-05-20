import React, {useEffect, useState} from "react";
import {fetchemployeetimesheetapicall} from "../../ApiServices/EmployeeApiservices/Employee";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import moment from "moment";
import {useFormik} from "formik";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Grid,
  Typography,
  Card,
  Button,
  Drawer,
  Container,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  TablePagination,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

import Empty from "../../common/EmptyFolder/Empty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import * as Yup from "yup";
import ListIcon from "@mui/icons-material/List";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../common/Modal/TModal";

const isprojectinfodata = [
  {ProjectId: "P001", Project_Name: "Project One"},
  {ProjectId: "P002", Project_Name: "Project Two"},
];

const validationSchema = Yup.object().shape({
  entries: Yup.array().of(
    Yup.object().shape({
      Staff_Id: Yup.string().required("Staff Id is required"),
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

const EmployeeTimesheets = () => {
  const [IsEmployeeTimesheetData, setIsEmployeeTimesheetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [IsEmployeeProjectdata, setIsEmployeeProjectdata] = useState([]);
  const [IsOpenfirst, setIsOpenfirst] = useState(false);

  const [IsOpen, setIsOpen] = useState(false);

  //
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectid, setProjectid] = useState(null);
  //
  const stats = [
    {
      label: "Total Hours",
      value: IsEmployeeTimesheetData.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: IsEmployeeTimesheetData.length,
      icon: <ListIcon color="secondary" />,
    },
  ];
  const fetchemployeetimesheetfunc = async () => {
    try {
      const response = await fetchemployeetimesheetapicall({
        params: {page: page + 1, limit: rowsPerPage, search},
      });
      if (response.success) {
        setIsEmployeeTimesheetData(response.result);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

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
      const allIds = IsEmployeeTimesheetData.map((item) => item.Timesheet_Id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const isAllSelected =
    IsEmployeeTimesheetData?.length > 0 &&
    selectedItems.length === IsEmployeeTimesheetData.length;

  //  Fill Timesheet
  var id = 1 + 1;
  const formik = useFormik({
    initialValues: {
      entries: [
        {
          Staff_Id: id,
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
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  //  Fill Timesheetconst isprojectinfodata = [

  useEffect(() => {
    fetchemployeetimesheetfunc();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Employee Timesheet" />
      {/* modal */}
      <Button onClick={() => setIsOpen(true)}>Fill TimeSheet</Button>

      {IsOpen && (
        <>
          <TModal
            open={IsOpen}
            onClose={() => setIsOpen(false)}
            title={"fill Timesheet"}
          >
            <Container maxWidth="sm" sx={{p: 2}}>
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
                    <TextField
                      fullWidth
                      label="Staff ID"
                      name={`entries[${index}].Staff_Id`}
                      value={entry.Staff_Id}
                      disabled
                      margin="normal"
                    />

                    <FormControl fullWidth sx={{mb: 2}}>
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
                      InputLabelProps={{shrink: true}}
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
                        Boolean(
                          formik.errors.entries?.[index]?.task_description
                        )
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
                      style={{marginTop: "10px"}}
                    />
                    {formik.touched.entries?.[index]?.attachement &&
                      formik.errors.entries?.[index]?.attachement && (
                        <div style={{color: "red"}}>
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
                      sx={{mt: 2}}
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
                        Staff_Id: id,
                        project: "",
                        hours: "",
                        day: "",
                        Description: "",
                        task_description: "",
                        attachement: null,
                      },
                    ])
                  }
                  sx={{mb: 2}}
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
          </TModal>
        </>
      )}

      {/* modal */}
      {selectedItems.length > 0 ? (
        <>
          <Button>Approve</Button>
          <Button>dis Approve</Button>
          <Button>Billed</Button>
        </>
      ) : null}

      {/* timesheet data */}
      <Grid container spacing={2} sx={{my: 1}}>
        {stats.map((stat, index) => (
          <Grid item sm={12} md={3} lg={3} key={index}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {stat.icon}
              <Typography variant="h6">
                {stat.label}: {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* timesheet data */}

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="client table">
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
                        selectedItems.length < IsEmployeeTimesheetData?.length
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
            {IsEmployeeTimesheetData.length > 0 ? (
              IsEmployeeTimesheetData.map((item, index) => (
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
                    {moment(item.created_at).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{item.ProjectName || null}</TableCell>
                  <TableCell>{item.StaffName || null}</TableCell>
                  <TableCell>{item.Description || null}</TableCell>
                  <TableCell>{item.hours || null}</TableCell>
                  <TableCell>{item.billed_hours || null}</TableCell>
                  <TableCell>{item.ok_hours || null}</TableCell>
                  <TableCell>{item.blank_hours}</TableCell>
                  <TableCell>{item.approval_status}</TableCell>
                  <TableCell>{item.billing_status}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={30} align="center">
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutDesign>
  );
};

export default EmployeeTimesheets;
