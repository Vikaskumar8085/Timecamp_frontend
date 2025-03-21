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
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import Empty from "../../../common/EmptyFolder/Empty";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const ContractorTable = ({
  Iscontractordata,
  setIsEdit,
  setIsOpen,
  loading,
  search,
  page,
  rowsPerPage,
  totalCount,
  setRowsPerPage,
  setPage,
  setSearch,
}) => {
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  return (
    <>
      {/* Toggle Button */}

      <HeaderTab>
        <Button
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "0px 10px",
            color: "white",
          }}
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
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

      {/* Table View */}
      {loading ? (
        <CircularProgress />
      ) : viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="contractor table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">First Name</TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="left">Username</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Manager</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Iscontractordata.length > 0 ? (
                    Iscontractordata.map((item, index) => (
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
                          <Link to={`/contractor-info/${item.staff_Id}`}>
                            <VisibilityIcon />
                          </Link>

                          <Button
                            onClick={() => {
                              setIsEdit(item);
                              setIsOpen(true);
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
        // Grid View
        <Grid container spacing={2}>
          {Iscontractordata.length > 0 ? (
            Iscontractordata.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}} key={index}>
                <Card component={Paper} elevation={1}>
                  <CardContent>
                    <Typography variant="h6">
                      {item.FirstName} {item.LastName}
                    </Typography>
                    <Typography variant="body2">Email: {item.Email}</Typography>
                    <Typography variant="body2">Phone: {item.Phone}</Typography>
                    <Typography variant="body2">
                      Manager:{" "}
                      <Chip
                        label={item.Manager || "NA"}
                        color={item.Manager ? "success" : "error"}
                      />
                    </Typography>
                    <Typography variant="body2">
                      Address: {item.Address}
                    </Typography>
                    <Link to={`/contractor-info/${item.staff_Id}`}>
                      <VisibilityIcon />
                    </Link>

                    <Button
                      onClick={() => {
                        setIsEdit(item);
                        setIsOpen(true);
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
          setPage(0); // Reset page to 0 when changing rows per page
        }}
      />
    </>
  );
};

export default ContractorTable;
