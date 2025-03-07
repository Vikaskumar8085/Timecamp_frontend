import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
const ManagerProjectTimesheet = ({IsManagerProjectTimesheetdata}) => {
  console.log(
    IsManagerProjectTimesheetdata,
    ">Nkljfasffsdfsdfjsdfsdfsdfsdfdslkjdlkjlkjlkjlkj"
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  return (
    <>
      <BreadCrumb pageName="Manager Timesheet" />

      {selectedItems.length > 0 ? (
        <>
          <Button
            sx={{
              background: "green",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Approve
          </Button>
          <Button
            sx={{
              background: "red",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Disapprove
          </Button>

          <Button
            onClick={() => SendForApprovel()}
            sx={{
              background: "orange",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Send For Approved
          </Button>
          <Button
            sx={{
              background: "#2c3e50",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            delete selected
          </Button>
        </>
      ) : null}

      <Card>
        <CardHeader title="Project Timesheet " />
        <CardContent>
          {IsManagerProjectTimesheetdata?.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SelectId</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>
                      <b>TS Code</b>
                    </TableCell>
                    <TableCell>
                      <b>Hours</b>
                    </TableCell>
                    <TableCell>
                      <b>Task Description</b>
                    </TableCell>
                    <TableCell>
                      <b>Description</b>
                    </TableCell>
                    <TableCell>
                      <b>Approval Status</b>
                    </TableCell>
                    <TableCell>
                      <b>Billing Status</b>
                    </TableCell>
                    <TableCell>
                      <b>Start Time</b>
                    </TableCell>
                    <TableCell>
                      <b>End Time</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {IsManagerProjectTimesheetdata.flatMap((item) => {
                    return item?.findtimesheet?.map((entry, index) => {
                      return (
                        <TableRow key={entry._id}>
                          <TableCell>
                            <FormControlLabel
                              key={entry.Timesheet_Id}
                              control={
                                <Checkbox
                                  checked={selectedItems.includes(
                                    entry.Timesheet_Id
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(entry.Timesheet_Id)
                                  }
                                />
                              }
                              label={entry.name}
                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{entry?.ts_code || "N/A"}</TableCell>
                          <TableCell>{entry?.hours || "N/A"}</TableCell>
                          <TableCell>
                            {entry?.task_description || "N/A"}
                          </TableCell>
                          <TableCell>{entry?.Description || "N/A"}</TableCell>
                          <TableCell>
                            {entry.approval_status || "N/A"}
                          </TableCell>
                          <TableCell>
                            {entry?.billing_status || "N/A"}
                          </TableCell>
                          <TableCell>{entry?.start_time || "N/A"}</TableCell>
                          <TableCell>{entry?.end_time || "N/A"}</TableCell>
                        </TableRow>
                      );
                    });
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center">No timesheet data found.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ManagerProjectTimesheet;
