import React, {useState, useEffect} from "react";
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
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import EditIcon from "@mui/icons-material/Edit";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {fetchactivecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import Empty from "../../../common/EmptyFolder/Empty";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Activecontractor = () => {
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // Page starts from 0 in TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchContractors = async () => {
      setLoading(true);
      try {
        const response = await fetchactivecontractorapicall({
          params: {
            search,
            page: page + 1, // Backend usually expects 1-based index
            limit: rowsPerPage,
          },
        });
        if (response.success) {
          setContractors(response.result);
          setTotalCount(response.totalCount || 0);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContractors();
  }, [search, page, rowsPerPage]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Active contractor" />

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
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="contractor table">
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
                  {contractors.length > 0 ? (
                    contractors.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.FirstName}</TableCell>
                        <TableCell>{item.LastName}</TableCell>
                        <TableCell>{item.UserName}</TableCell>
                        <TableCell>{item.Email}</TableCell>
                        <TableCell>{item.Phone}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.Manager || "NA"}
                            color={item.Manager ? "success" : "error"}
                          />
                        </TableCell>
                        <TableCell>{item.Address}</TableCell>
                        <TableCell>
                          <Link to={`/contractor-info/${item.staff_Id}`}>
                            <VisibilityIcon />
                          </Link>

                          <Button
                            onClick={() => {
                              setIsEdit(item);
                              setIsOpen(true);
                            }}
                          >
                            <EditIcon />
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
        // Grid View
        <Grid container spacing={2}>
          {contractors.length > 0 ? (
            contractors.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}} key={index}>
                <Card component={Paper} elevation={1}>
                  <CardContent>
                    <Typography variant="h6">
                      {item.FirstName} {item.LastName}
                    </Typography>
                    <Typography variant="body2">Email: {item.Email}</Typography>
                    <Typography variant="body2">Phone: {item.Phone}</Typography>
                    <Typography variant="body2">
                      Mananger:
                      <Chip
                        label={item.Manager || "NA"}
                        color={item.Manager ? "success" : "error"}
                      />
                    </Typography>
                    <Typography variant="body2">
                      Address: {item.Address}
                    </Typography>
                    <Link to={`/contractor-info/${item.staff_Id}`}>
                      <VisibilityIcon />
                    </Link>

                    <Button
                      onClick={() => {
                        setIsEdit(item);
                        setIsOpen(true);
                      }}
                    >
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
    </LayoutDesign>
  );
};

export default Activecontractor;
