import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientinactiveprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderTab from "../../common/HeaderTab/HeaderTab";

const ClientInactiveProject = () => {
  const [isclientactiveproject, setIsclientactiveproject] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [totalProjects, setTotalProjects] = useState(0);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false); // State to manage loading

  const fetchinactiveclientproject = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetchclientinactiveprojectapicall({
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: search,
        },
      });
      if (response.success) {
        setIsclientactiveproject(response.result);
        setTotalProjects(response.totalProjects);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page when search changes
  };

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const toggleView = () => {
    setView(view === "table" ? "grid" : "table");
  };

  useEffect(() => {
    fetchinactiveclientproject();
  }, [page, rowsPerPage, search]);

  return (
    <div>
      <Layout>
        <BreadCrumb pageName="Client Inactive Project" />

        <HeaderTab>
          <Button
            variant="contained"
            onClick={toggleView}
            sx={{backgroundColor: "#2c3e50"}}
          >
            {view === "table" ? <GridViewIcon /> : <TableRowsIcon />}
          </Button>
        </HeaderTab>

        <TextField
          label="Search Projects"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />

        {loading ? (
          // Loader to show while fetching data
          <Box sx={{display: "flex", justifyContent: "center", marginTop: 5}}>
            <CircularProgress />
          </Box>
        ) : view === "table" ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Project Code</TableCell>
                  <TableCell align="left">Project Name</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Project Hours</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isclientactiveproject.length > 0
                  ? isclientactiveproject.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{item.Project_Code}</TableCell>
                        <TableCell>{item.Project_Name}</TableCell>
                        <TableCell>{item.Start_Date}</TableCell>
                        <TableCell>{item.End_Date}</TableCell>
                        <TableCell>{item.Project_Hours}</TableCell>
                        <TableCell>
                          <Link
                            to={`/client/client-pageinfo/${item?.ProjectId}`}
                          >
                            <VisibilityIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  : "null"}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>
            {isclientactiveproject.length > 0 ? (
              <Grid container spacing={3}>
                {isclientactiveproject.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Project {index + 1}: {item.Project_Name}
                        </Typography>
                        <Typography color="textSecondary">
                          Project Code: {item.Project_Code}
                        </Typography>
                        <Typography color="textSecondary">
                          Start Date: {item.Start_Date}
                        </Typography>
                        <Typography color="textSecondary">
                          End Date: {item.End_Date}
                        </Typography>
                        <Typography color="textSecondary">
                          Project Hours: {item.Project_Hours}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">
                          <Link
                            to={`/client/client-pageinfo/${item?.ProjectId}`}
                          >
                            <VisibilityIcon />
                          </Link>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" align="center">
                No Projects Available
              </Typography>
            )}
          </div>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalProjects}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Layout>
    </div>
  );
};

export default ClientInactiveProject;
