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
  TextField,
  TablePagination,
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProjectTable = ({
  isProjectdata,
  setIsModalOpen,
  setIsEdit,
  search,
  setSearch,
  setLimit,
  limit,
  page,
  setPage,
  totalPages,
  handleDelete,
}) => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <>
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
      />

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
                    <TableCell align="left">Project Type</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isProjectdata.length > 0 ? (
                    isProjectdata.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{item.Project_Name}</TableCell>
                        <TableCell align="left">{item.Project_Code}</TableCell>
                        <TableCell align="left">{item.Project_Hours}</TableCell>
                        <TableCell align="left">{item.Start_Date}</TableCell>
                        <TableCell align="left">{item.End_Date}</TableCell>
                        <TableCell align="left">{item.Project_Type}</TableCell>
                        <TableCell align="left">
                          <Link to={`/project-info/${item.ProjectId}`}>
                            <VisibilityIcon />
                          </Link>
                          <Button
                            onClick={() => {
                              setIsEdit(item);
                              setIsModalOpen(true);
                            }}
                          >
                            <EditIcon />
                          </Button>

                          <Button onClick={() => handleDelete(item.ProjectId)}>
                            Delete
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
          {isProjectdata.length > 0 ? (
            isProjectdata.map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Project_Name}</Typography>
                    <Typography>Code: {item.Project_Code}</Typography>
                    <Typography>Hours: {item.Project_Hours}</Typography>
                    <Typography>Start: {item.Start_Date}</Typography>
                    <Typography>End: {item.End_Date}</Typography>
                    <Link to={`/project-info/${item.ProjectId}`}>
                      <VisibilityIcon />
                    </Link>
                    <Button
                      onClick={() => {
                        setIsEdit(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(item.ProjectId)}>
                      Delete
                    </Button>
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

      <TablePagination
        component="div"
        count={totalPages * limit}
        page={page - 1}
        onPageChange={(_, newPage) => setPage(newPage + 1)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default ProjectTable;
