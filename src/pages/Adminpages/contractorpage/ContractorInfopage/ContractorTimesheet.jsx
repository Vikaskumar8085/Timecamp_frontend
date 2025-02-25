import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const ContractorTimesheet = ({data}) => {
  const {employeeTimesheets, projectManagerTimesheet} = data[0];
  const timesheets = [...employeeTimesheets, ...projectManagerTimesheet];
  const [selectedItems, setSelectedItems] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  return (
    <TableContainer component={Paper} sx={{margin: "20px", padding: "20px"}}>
      <Typography variant="h6" sx={{marginBottom: "10px"}}>
        Timesheets
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select Id</TableCell>
            <TableCell>Timesheet ID</TableCell>
            <TableCell>Staff ID</TableCell>
            <TableCell>Company ID</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Approval Status</TableCell>
            <TableCell>Billing Status</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timesheets.length > 0 ? (
            timesheets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sheet) => (
                <TableRow key={sheet._id}>
                  <TableCell>
                    <FormControlLabel
                      key={sheet.Timesheet_Id}
                      control={
                        <Checkbox
                          checked={selectedItems.includes(sheet.Timesheet_Id)}
                          onChange={() =>
                            handleCheckboxChange(sheet.Timesheet_Id)
                          }
                        />
                      }
                      label={sheet.name}
                    />
                  </TableCell>
                  <TableCell>{sheet.Timesheet_Id}</TableCell>
                  <TableCell>{sheet.Staff_Id}</TableCell>
                  <TableCell>{sheet.CompanyId || "N/A"}</TableCell>
                  <TableCell>{sheet.hours}</TableCell>
                  <TableCell>{sheet.project}</TableCell>
                  <TableCell>{sheet.task_description}</TableCell>
                  <TableCell>{sheet.approval_status}</TableCell>
                  <TableCell>{sheet.billing_status}</TableCell>
                  <TableCell>{sheet.start_time}</TableCell>
                  <TableCell>{sheet.end_time}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                No timesheets available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={timesheets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ContractorTimesheet;
