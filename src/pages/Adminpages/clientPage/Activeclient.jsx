import React, {useState, useCallback, useEffect} from "react";
import {fetchactiveclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import Empty from "../../../common/EmptyFolder/Empty";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  TextField,
  TablePagination,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Activeclient = () => {
  const [isactiveclientdata, setIsactiveclientdata] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const getactiveclient = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchactiveclientapicall({
        params: {
          search,
          page: page + 1, // Backend expects 1-based index
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsactiveclientdata(response.result);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Error fetching clients:", error?.message);
    } finally {
      setLoading(false);
    }
  }, [search, page, rowsPerPage]);

  // Fetch data on component mount & when dependencies change
  useEffect(() => {
    getactiveclient();
  }, [getactiveclient]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page on new search
  };

  // Handle pagination changes
  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Active Client" />
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

      {/* Search Input */}
      <TextField
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{mb: 2}}
      />

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : viewMode === "table" ? (
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
                  {isactiveclientdata.length > 0 ? (
                    isactiveclientdata.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.Company_Name}</TableCell>
                        <TableCell>{item.Client_Name}</TableCell>
                        <TableCell>{item.Client_Email}</TableCell>
                        <TableCell>{item.Client_Phone}</TableCell>
                        <TableCell>{item.Client_Address}</TableCell>
                        <TableCell>{item.Client_Postal_Code}</TableCell>
                        <TableCell>{item.GstNumber}</TableCell>
                        <TableCell>
                          {" "}
                          <Chip
                            label={item.Client_Status}
                            color={
                              item.Client_Status === "Active"
                                ? "success"
                                : item.Client_Status === "InActive"
                                ? "warning"
                                : "error"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            style={{textDecoration: "none"}}
                            to={`/client-info/${item.Client_Id}`}
                          >
                            <VisibilityIcon />
                          </Link>
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

            {/* Pagination Controls */}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {isactiveclientdata.length > 0 ? (
            isactiveclientdata.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Company_Name}</Typography>
                    <Typography>Name: {item.Client_Name}</Typography>
                    <Typography>Email: {item.Client_Email}</Typography>
                    <Typography>Phone: {item.Client_Phone}</Typography>
                    <Typography>Address: {item.Client_Address}</Typography>
                    <Typography>
                      Postal Code: {item.Client_Postal_Code}
                    </Typography>
                    <Typography>Gst Number: {item.GstNumber}</Typography>
                    <Typography>
                      Status:{" "}
                      <Chip
                        label={item.Client_Status}
                        color={
                          item.Client_Status === "Active"
                            ? "success"
                            : item.Client_Status === "InActive"
                            ? "warning"
                            : "error"
                        }
                      />
                    </Typography>
                    <Link
                      style={{textDecoration: "none"}}
                      to={`/client-info/${item.Client_Id}`}
                    >
                      <VisibilityIcon />
                    </Link>
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
        count={totalPages * rowsPerPage} // Total items count
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </LayoutDesign>
  );
};

export default Activeclient;
