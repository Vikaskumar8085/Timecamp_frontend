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
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";

const ProjectTable = ({isProjectdata}) => {
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

      {viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Project Name</TableCell>
                    <TableCell align="left">Project Code</TableCell>
                    {/* <TableCell align="left">Client Name</TableCell> */}
                    <TableCell align="left">Project Hours</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
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
                        <TableCell align="left">
                          <Link to={`/project-info/${item.ProjectId}`}>
                            View
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
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {isProjectdata.length > 0 ? (
            isProjectdata.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Project_Name}</Typography>
                    <Typography>Name: {item.Project_Code}</Typography>
                    <Typography>Email: {item.Project_Hours}</Typography>
                    <Typography>Phone: {item.Start_Date}</Typography>
                    <Typography>Address: {item.End_Date}</Typography>
                    <Link to={`/project-info/${item.ProjectId}`}>View</Link>
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
    </>
  );
};

export default ProjectTable;
