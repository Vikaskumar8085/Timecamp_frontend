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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
const DesignationTable = ({isdesignationdata}) => {
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  return (
    <div>
      <Button
        onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />}
      </Button>

      {viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <TableContainer component={Paper} sx={{mt: 2}}>
              <Table sx={{minWidth: 650}} aria-label="designation table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Designation Name</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isdesignationdata.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        {item.Designation_Name}
                      </TableCell>
                      <TableCell align="left">
                        <Button color="error">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{mt: 2}}>
          {isdesignationdata.map((item, index) => (
            <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">ID: {index + 1}</Typography>
                  <Typography variant="body1">
                    {item.Designation_Name}
                  </Typography>
                  <Button color="error" sx={{mt: 1}}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DesignationTable;
