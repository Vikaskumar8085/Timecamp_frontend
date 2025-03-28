import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import React, {useEffect, useState} from "react";
import {
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Button,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import apiInstance from "../../ApiInstance/apiInstance";
import ManageProjectForm from "../../Component/ManagerComponents/ManageProjectForm";
import {createManagerProjectapicall} from "../../ApiServices/ManagerApiServices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {Link} from "react-router-dom";
const ManagerProject = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const dispatch = useDispatch();

  const fetchprojects = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-project",
        {
          params: {page: page + 1, limit: rowsPerPage, search: search.trim()},
        }
      );

      setData(response.data.result);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createManagerProjectapicall(value);
      if (response?.success) {
        setIsOpen(false);
        dispatch(setLoader(false));
        fetchprojects();
        toast.success(response?.message);
      } else {
        fetchprojects();
        setIsOpen(false);
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsOpen(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedProjects = data
    .flatMap((item) => [...item.fetchproject, ...item.fetchteamproject])
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    fetchprojects();
  }, [page, rowsPerPage, search]);

  return (
    <Layout>
      <BreadCrumb pageName="ManagerProject" />

      <Button
        onClick={() => setIsOpen(true)}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Create Project
      </Button>
      {IsOpen && (
        <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
          <ManageProjectForm handleSubmit={handleSubmit} />
        </Drawer>
      )}
      <Paper sx={{width: "100%", overflow: "hidden", padding: 2}}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{marginBottom: 2}}
        />

        {/* Data Table */}

        <TableContainer sx={{mt: 3}}>
          <Typography variant="h6" sx={{p: 2}}>
            Project List
          </Typography>
          {loading ? (
            <CircularProgress sx={{display: "block", margin: "20px auto"}} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Project Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Project Code</b>
                  </TableCell>
                  <TableCell>
                    <b>Start Date</b>
                  </TableCell>
                  <TableCell>
                    <b>End Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Project Type</b>
                  </TableCell>
                  <TableCell>
                    <b>Hours</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <>
                    {item.fetchproject.map((project) => (
                      <TableRow key={project._id}>
                        <TableCell>{project.Project_Name}</TableCell>
                        <TableCell>{project.Project_Code}</TableCell>
                        <TableCell>{project.Start_Date}</TableCell>
                        <TableCell>{project.End_Date}</TableCell>
                        <TableCell>{project.Project_Type}</TableCell>
                        <TableCell>{project.Project_Hours}</TableCell>
                        <TableCell>
                          {project.Project_Status ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/manager/project-info/${project?.ProjectId}`}
                          >
                            view
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                    {item.fetchteamproject.map((teamProject) => (
                      <TableRow key={teamProject._id}>
                        <TableCell>{teamProject.Project_Name}</TableCell>
                        <TableCell>{teamProject.Project_Code}</TableCell>
                        <TableCell>{teamProject.Start_Date}</TableCell>
                        <TableCell>{teamProject.End_Date}</TableCell>
                        <TableCell>{teamProject.Project_Type}</TableCell>
                        <TableCell>{teamProject.Project_Hours}</TableCell>
                        <TableCell>
                          {teamProject.Project_Status ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/manager/project-info/${teamProject?.ProjectId}`}
                          >
                            {" "}
                            view
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
};

export default ManagerProject;
{
  /* <TableCell>{manager.Project_Name}</TableCell>
<TableCell>{manager.Project_Code}</TableCell>
<TableCell>{manager.Start_Date}</TableCell>
<TableCell>{manager.End_Date}</TableCell>
<TableCell>{manager.Project_Status}</TableCell>
<TableCell>{manager.Project_Hours}</TableCell>
<TableCell>{manager.Project_Type}</TableCell> */
}
