import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import apiInstance from "../../ApiInstance/apiInstance";
const ManagerProject = () => {
  const [managers, setManagers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchprojects = async () => {
    try {
      const {data} = await apiInstance.get("/v2/manager/fetch-manager-staff", {
        params: {
          page: page + 1, // API expects 1-based index
          limit: rowsPerPage,
          search,
          sortBy,
          order,
        },
      });

      setManagers(data.result);
      setTotalRecords(data.totalRecords);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  useEffect(() => {
    fetchprojects();
  }, [page, rowsPerPage, search, sortBy, order]);

  return (
    <Layout>
      <BreadCrumb pageName="ManagerProject" />
      <Paper sx={{width: "100%", overflow: "hidden", padding: 2}}>
        <Typography variant="h6" gutterBottom>
          Manager Team List
        </Typography>

        {/* Search Input */}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{marginBottom: 2}}
        />

        {/* Sorting Options */}
        <Box sx={{display: "flex", gap: 2, marginBottom: 2}}>
          <FormControl sx={{minWidth: 150}}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{minWidth: 150}}>
            <InputLabel>Order</InputLabel>
            <Select value={order} onChange={(e) => setOrder(e.target.value)}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Data Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Projects</TableCell>
                <TableCell>Team Projects</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {managers.map((manager) => (
                <TableRow key={manager._id}>
                  <TableCell>{manager.name}</TableCell>
                  <TableCell>{manager.email}</TableCell>
                  <TableCell>
                    {manager.fetchproject.length > 0 ? (
                      manager.fetchproject.map((proj) => (
                        <Typography key={proj._id}>
                          {proj.Project_Name}
                        </Typography>
                      ))
                    ) : (
                      <Typography color="textSecondary">No Projects</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {manager.fetchteamproject.length > 0 ? (
                      manager.fetchteamproject.map((proj) => (
                        <Typography key={proj._id}>
                          {proj.Project_Name}
                        </Typography>
                      ))
                    ) : (
                      <Typography color="textSecondary">
                        No Team Projects
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Layout>
  );
};

export default ManagerProject;
