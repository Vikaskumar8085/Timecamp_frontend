import React, {useEffect, useState} from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {fetchclientprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
import {Link} from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import HeaderTab from "../../common/HeaderTab/HeaderTab";
import toast from "react-hot-toast";
const ClientProjects = () => {
  const [Isclientdata, setisclientdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProjects, setTotalProjects] = useState(0);
  const [view, setView] = useState("table");
  const fetchclientproject = async () => {
    try {
      setLoading(true);
      const response = await fetchclientprojectapicall({
        params: {
          page: page + 1, // page starts from 1 in API
          limit: rowsPerPage,
          search: search,
        },
      });
      console.log(response, "response,response");
      if (response.success) {
        setisclientdata(response.result);
        setTotalProjects(response.totalProjects);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }

      console.log(error?.response?.data, "data");
      console.log(error?.message);
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to the first page when search changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const toggleView = () => {
    setView(view === "table" ? "grid" : "table");
  };

  useEffect(() => {
    fetchclientproject();
  }, [page, rowsPerPage, search]);

  return (
    <Layout>
      <BreadCrumb pageName="Client  Projects" />
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
        sx={{my: 1}}
        value={search}
        onChange={handleSearchChange}
      />

      {view === "table" ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Project Code</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Project Hours</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Isclientdata.length > 0
                ? Isclientdata.map((item, index) => (
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
                        <Link to={`/client/client-pageinfo/${item?.ProjectId}`}>
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
          {Isclientdata.length > 0 ? (
            <Grid container spacing={3}>
              {Isclientdata.map((item, index) => (
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
                        <Link to={`/client/client-pageinfo/${item?.ProjectId}`}>
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
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Layout>
  );
};

export default ClientProjects;
