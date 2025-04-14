import React, {useEffect, useState} from "react";
import {fetchemployeetimesheetapicall} from "../../ApiServices/EmployeeApiservices/Employee";
import Layout from "../../Layoutcomponents/Layout/Layout";
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
} from "@mui/material";
import Empty from "../../common/EmptyFolder/Empty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";
import ListIcon from "@mui/icons-material/List";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
const EmployeeTimesheets = () => {
  const [IsEmployeeTimesheetData, setIsEmployeeTimesheetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [IsEmployeeProjectdata, setIsEmployeeProjectdata] = useState([]);
  const [IsOpenfirst, setIsOpenfirst] = useState(false);

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

  useEffect(() => {
    fetchemployeetimesheetfunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Employee Timesheet" />

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
    </Layout>
  );
};

export default EmployeeTimesheets;
