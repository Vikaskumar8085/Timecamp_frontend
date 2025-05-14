import React, {useState} from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Pagination,
  CircularProgress,
  TablePagination,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import {Link} from "react-router-dom";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const EmployeeTable = ({
  IsEmployeeData,
  setIsEdit,
  setisOpen,
  loading,
  search,
  page,
  rowsPerPage,
  totalCount,
  setRowsPerPage,
  setPage,
  setSearch,
}) => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div>
      <HeaderTab>
        <Button
          variant="contained"
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "0px 10px",
            color: "white",
          }}
        >
          {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />}
        </Button>
      </HeaderTab>
      <TextField
        label="Search"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{mb: 2}}
      />
      {viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="employee table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Employee FirstName</TableCell>
                    <TableCell>Employee LastName</TableCell>
                    <TableCell>Employee Username</TableCell>
                    <TableCell>Employee Email</TableCell>
                    <TableCell>Employee Phone</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Employee Address</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {IsEmployeeData.length > 0 ? (
                    IsEmployeeData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.FirstName}</TableCell>
                        <TableCell>{item.LastName}</TableCell>
                        <TableCell>{item.UserName}</TableCell>
                        <TableCell>{item.Email}</TableCell>
                        <TableCell>{item.Phone}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.Manager || "NA"}
                            color={item.Manager ? "success" : "error"}
                          />
                        </TableCell>

                        <TableCell>{item.Address}</TableCell>
                        <TableCell>
                          <Link to={`/employee-info/${item.staff_Id}`}>
                            <VisibilityIcon />
                          </Link>

                          <Button
                            onClick={() => {
                              setIsEdit(item);
                              setisOpen(true);
                            }}
                          >
                            <EditIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Empty />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {IsEmployeeData.length > 0 ? (
            IsEmployeeData.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {item.FirstName} {item.LastName}
                    </Typography>
                    <Typography>Email: {item.Email}</Typography>
                    <Typography>Phone: {item.Phone}</Typography>
                    <Typography>
                      Manager:
                      <Chip
                        label={item.Manager || "NA"}
                        color={item.Manager ? "success" : "error"}
                      />
                    </Typography>
                    <Typography>Address: {item.Address}</Typography>
                    <Link to={`/employee-info/${item.staff_Id}`}>
                      <VisibilityIcon />
                    </Link>

                    <Button
                      onClick={() => {
                        setIsEdit(item);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid size={{sm: 12}} display="flex" justifyContent="center">
              <Empty />
            </Grid>
          )}
        </Grid>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default EmployeeTable;
