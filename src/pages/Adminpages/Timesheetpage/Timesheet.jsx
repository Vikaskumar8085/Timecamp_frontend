import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import * as XLSX from "xlsx";
import {
  Button,
  Drawer,
  Grid2,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import moment from "moment";
import UploadTimesheet from "../../../Component/AdminComponents/Timesheet/UploadTimesheet";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {fetchtimesheetapicall} from "../../../ApiServices/TimesheetApiServices";
import toast from "react-hot-toast";
import {uploadtimesheetcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import apiInstance from "../../../ApiInstance/apiInstance";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
  disapprovetimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";

const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsTimesheetdata, setIsTimesheetdata] = useState([]);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectid, setProjectid] = useState(null);

  const exportToExcel = () => {
    const formattedData = IsTimesheetdata.map(({_id, __v, ...rest}) => ({
      ...rest,
      CompanyImage: "https://example.com/company-logo.png", // Replace with actual image URL if available
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Timesheet.xlsx");
  };

  const fetchtimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchtimesheetapicall();
      if (response.success) {
        dispatch(setLoader(false));
        setIsTimesheetdata(response.result);
      }
      console.log(response);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const handleUploadTimesheet = async (formData) => {
    try {
      dispatch(setLoader(true));
      const response = await uploadtimesheetcsvapicall(formData);
      if (response.success) {
        fetchtimesheetfunc();
        setIsModalOpen(false);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  const approvetimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: isProjectid,
        payload: values,
      };
      const response = await approvetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchtimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchtimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const disapprovetimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: isProjectid,
        payload: values,
      };
      const response = await disapprovetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchtimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchtimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const billedtimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: isProjectid,
        payload: values,
      };
      const response = await billedtimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchtimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchtimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchtimesheetfunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="TimeSheet" />
      <div>
        <Button
          startIcon={<FileUploadIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "10px 15px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Upload Timesheet
        </Button>
        {/* <Button onClick={() => exportToExcel()}>Export to Excel</Button> */}

        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anchor="right"
          >
            <UploadTimesheet
              setIsModalOpen={setIsModalOpen}
              handleUploadTimesheet={handleUploadTimesheet}
            />
          </Drawer>
        ) : null}
        {selectedItems.length > 0 ? (
          <div sx={{margin: "10px 0px"}}>
            <Button
              sx={{
                backgroundColor: "Green",
                color: "white",
                margin: "10px 0px",
                padding: "5px 10px",
              }}
              onClick={() => approvetimesheetfunc(selectedItems)}
            >
              Approve
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                margin: "10px 10px",
                padding: "5px 10px",
              }}
              onClick={() => disapprovetimesheetfunc(selectedItems)}
            >
              DisApprove
            </Button>

            <Button
              sx={{
                backgroundColor: "skyblue",
                color: "white",
                margin: "10px 10px",
                padding: "5px 10px",
              }}
              onClick={() => billedtimesheetfunc(selectedItems)}
            >
              Billed
            </Button>
          </div>
        ) : null}
      </div>

      <Grid2 container spacing={2}>
        <Grid2 item sm={12} md={3} lg={3}>
          1
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          2
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          3
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          4
        </Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>Select </TableCell>
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
            {IsTimesheetdata?.length > 0 ? (
              IsTimesheetdata?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
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
                  <TableCell>{item.ProjectName.join(", ")}</TableCell>
                  <TableCell>{item.StaffName.join(", ")}</TableCell>
                  <TableCell>{item.Description}</TableCell>
                  <TableCell>{item.hours}</TableCell>
                  <TableCell>{item.billed_hours}</TableCell>
                  <TableCell>{item.ok_hours}</TableCell>
                  <TableCell>{item.blank_hours}</TableCell>
                  <TableCell>{item.approval_status}</TableCell>
                  <TableCell>{item.billing_status}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  {/* <Empty /> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Timesheet;
