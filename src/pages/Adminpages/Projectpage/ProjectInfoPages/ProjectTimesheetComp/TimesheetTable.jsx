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
  Button,
} from "@mui/material";

const TimesheetTable = ({
  data,
  approveprojectfunc,
  disapproveprojectfunc,
  billedprojectfunc,
  selectedItems,
  setSelectedItems,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {selectedItems.length > 0 ? (
        <div sx={{margin: "10px 0px"}}>
          <Button
            sx={{
              backgroundColor: "Green",
              color: "white",
              margin: "10px 0px",
              padding: "5px 10px",
            }}
            onClick={() => approveprojectfunc(selectedItems)}
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
            onClick={() => disapproveprojectfunc(selectedItems)}
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
            onClick={() => billedprojectfunc(selectedItems)}
          >
            Billed
          </Button>
        </div>
      ) : null}
      <Paper sx={{width: "100%", overflow: "hidden"}}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select Id</TableCell>

                <TableCell>Project Name</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Approval Status</TableCell>
                <TableCell>Billing Status</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <FormControlLabel
                        key={row.Timesheet_Id}
                        control={
                          <Checkbox
                            checked={selectedItems.includes(row.Timesheet_Id)}
                            onChange={() =>
                              handleCheckboxChange(row.Timesheet_Id)
                            }
                          />
                        }
                        label={row.name}
                      />
                    </TableCell>
                    <TableCell>{row.ProjectName.join(", ")}</TableCell>
                    <TableCell>{row.StaffName.join(", ")}</TableCell>
                    <TableCell>{row.task_description}</TableCell>
                    <TableCell>{row.hours}</TableCell>
                    <TableCell>{row.approval_status}</TableCell>
                    <TableCell>{row.billing_status}</TableCell>
                    <TableCell>{row.day}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TimesheetTable;
