import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const ClientTable = ({
  Isclientdata,
  handleOpen,
  removeclientfunc,
  setSearch,
  search,
  setRowsPerPage,
  totalClients,
  rowsPerPage,
  page,
  setPage,
}) => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div>
      <HeaderTab>
        <Button
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
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); // Reset page when searching
        }}
        sx={{mb: 2}}
      />

      {viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="client table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Postal Code</TableCell>
                    <TableCell>Gst Number</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Isclientdata.length > 0 ? (
                    Isclientdata.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.Company_Name}</TableCell>
                        <TableCell>{item.Client_Name}</TableCell>
                        <TableCell>{item.Client_Email}</TableCell>
                        <TableCell>{item.Client_Phone}</TableCell>
                        <TableCell>{item.Client_Address}</TableCell>
                        <TableCell>{item.Client_Postal_Code}</TableCell>
                        <TableCell>{item.GstNumber}</TableCell>
                        <TableCell>{item.Client_Status}</TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Link
                            style={{textDecoration: "none"}}
                            to={`/client-info/${item.Client_Id}`}
                          >
                            <VisibilityIcon />
                          </Link>

                          <Button
                            onClick={() => handleOpen(item)}
                            color="primary"
                          >
                            <EditIcon />
                          </Button>
                          {/* <Button
                            onClick={() => {
                              removeclientfunc(item.Client_Id);
                            }}
                          >
                            delete
                          </Button> */}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
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
          {Isclientdata.length > 0 ? (
            Isclientdata.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Company_Name}</Typography>
                    <Typography>Name: {item.Client_Name}</Typography>
                    <Typography>Email: {item.Client_Email}</Typography>
                    <Typography>Phone: {item.Client_Phone}</Typography>
                    <Typography>Address: {item.Address}</Typography>
                    <Typography>
                      Postal Code: {item.Client_Postal_Code}
                    </Typography>
                    <Typography>Gst Number: {item.GstNumber}</Typography>
                    <Typography>Status: {item.Client_Status}</Typography>
                    <Link
                      style={{textDecoration: "none"}}
                      to={`/client-info/${item.Client_Id}`}
                    >
                      <VisibilityIcon />
                    </Link>
                    <Button onClick={() => handleOpen(item)} color="primary">
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
        component="div"
        count={totalClients}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default ClientTable;
