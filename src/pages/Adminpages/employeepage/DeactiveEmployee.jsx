import React, {useEffect, useState} from "react";
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
  CircularProgress,
  TablePagination,
  Chip,
} from "@mui/material";
import {fetchinactiveemployeeapicall} from "../../../ApiServices/AdminApiServices/Employee";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import Empty from "../../../common/EmptyFolder/Empty";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import EditIcon from "@mui/icons-material/Edit";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
const DeactiveEmployee = () => {
  const [viewMode, setViewMode] = useState("table");
  const [IsInactiveEmployeedata, setIsInactiveEmployeedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // Page starts from 0 in TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalCount, setTotalCount] = useState(0);
  const getInactiveemployee = async () => {
    try {
      const response = await fetchinactiveemployeeapicall({
        params: {
          search,
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      console.log(response, "response");
      if (response.success) {
        setIsInactiveEmployeedata(response.result);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInactiveemployee();
  }, [search, page, rowsPerPage]);
  return (
    <>
      <Layout>
        <BreadCrumb pageName="InActive Employee" />
        <HeaderTab>
          <TextField
            label="Search"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{mb: 2}}
          />
          <Button
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            sx={{background: "#2c3e50", padding: "8px 10px", color: "white"}}
          >
            {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />}
          </Button>
        </HeaderTab>
        {loading ? (
          <CircularProgress />
        ) : viewMode === "table" ? (
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="Active Employees Table">
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
                {IsInactiveEmployeedata.length > 0 ? (
                  IsInactiveEmployeedata.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{item.FirstName}</TableCell>
                      <TableCell>{item.LastName}</TableCell>
                      <TableCell>{item.UserName}</TableCell>
                      <TableCell>{item.Email}</TableCell>
                      <TableCell>{item.Phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.Manager || "NA"}
                          color={item.Manager ? "warning" : "error"}
                        />
                      </TableCell>
                      <TableCell>{item.Address}</TableCell>
                      <TableCell>
                        <Link to={`/contractor-info/${item.staff_Id}`}>
                          <VisibilityIcon />
                        </Link>
                        <Button>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Empty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={2}>
            {IsInactiveEmployeedata.length > 0 ? (
              IsInactiveEmployeedata.map((item, index) => (
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {item.FirstName} {item.LastName}
                      </Typography>
                      <Typography variant="body2">{item.Email}</Typography>
                      <Typography variant="body2">{item.Phone}</Typography>
                      <Typography variant="body2">
                        <Chip
                          label={item.Manager || "NA"}
                          color={item.Manager ? "danger" : "error"}
                        />
                      </Typography>
                      <Typography variant="body2">{item.Address}</Typography>
                      <Button>
                        <VisibilityIcon />
                      </Button>
                      <Button>
                        <EditIcon />
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" sx={{width: "100%"}}>
                <Empty />
              </Typography>
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
      </Layout>
    </>
  );
};

export default DeactiveEmployee;
