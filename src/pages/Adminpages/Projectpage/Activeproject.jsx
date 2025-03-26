import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import {useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
const Activeproject = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProjects, setTotalProjects] = useState(0);
  const [viewMode, setViewMode] = useState("table");

  const getactiveprojectapicall = async () => {
    try {
      const response = await fetchactiveprojectsapicall({
        params: {page: page + 1, limit: rowsPerPage, search},
      });

      if (response.success) {
        setProjects(response.result);
        setTotalProjects(response.totalProjects);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getactiveprojectapicall();
  }, [page, search, rowsPerPage]);

  return (
    <Layout>
      <BreadCrumb pageName="InActive Projects" />
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
        label="Search Projects"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />{" "}
      {viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Project Name</TableCell>
                    <TableCell align="left">Project Code</TableCell>
                    <TableCell align="left">Project Hours</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.length > 0 ? (
                    projects.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{item.Project_Name}</TableCell>
                        <TableCell align="left">{item.Project_Code}</TableCell>
                        <TableCell align="left">{item.Project_Hours}</TableCell>
                        <TableCell align="left">{item.Start_Date}</TableCell>
                        <TableCell align="left">{item.End_Date}</TableCell>
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
          {projects.length > 0 ? (
            projects.map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Project_Name}</Typography>
                    <Typography>Code: {item.Project_Code}</Typography>
                    <Typography>Hours: {item.Project_Hours}</Typography>
                    <Typography>Start: {item.Start_Date}</Typography>
                    <Typography>End: {item.End_Date}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} display="flex" justifyContent="center">
              <Empty />
            </Grid>
          )}
        </Grid>
      )}
      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalProjects}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default Activeproject;
