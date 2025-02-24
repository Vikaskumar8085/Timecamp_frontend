import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
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

const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsTimesheetdata, setIsTimesheetdata] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

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
      // dispatch(setLoader(true));
      const response = await uploadtimesheetcsvapicall(formData);

      console.log("response", response);
      fetchtimesheetfunc();
      setIsModalOpen(false);
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
        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anchor="right"
          >
            <UploadTimesheet handleUploadTimesheet={handleUploadTimesheet} />
          </Drawer>
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
            {IsTimesheetdata.length > 0 ? (
              IsTimesheetdata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <FormControlLabel
                      key={task.Timesheet_Id}
                      control={
                        <Checkbox
                          checked={selectedItems.includes(item.Timesheet_Id)}
                          onChange={() =>
                            handleCheckboxChange(item.Timesheet_Id)
                          }
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
                  <TableCell>{item.ProjectName}</TableCell>
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
