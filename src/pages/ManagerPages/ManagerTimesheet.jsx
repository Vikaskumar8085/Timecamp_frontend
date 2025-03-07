import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";

const ManagerTimesheet = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTimesheets = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get(
          `/v2/manager/timesheet?page=${page}&limit=${limit}`
        );
        setTimesheets(response.data.result);
        setTotalPages(Math.ceil(response.data.total / limit));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, [page, limit]);
  return (
    <Layout>
      <BreadCrumb pageName="Manager Timesheet" />
      <Paper sx={{padding: 2, margin: "auto"}}>
        <Typography variant="h5" gutterBottom>
          Manager Timesheets
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> ID</TableCell>
                  <TableCell>TS code</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Billed Hours</TableCell>
                  <TableCell>Ok Hours</TableCell>
                  <TableCell>Blank Hours</TableCell>
                  <TableCell>Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timesheets.map((timesheet, index) => (
                  <TableRow key={timesheet._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{timesheet.ts_code}</TableCell>
                    <TableCell>{timesheet?.projectName}</TableCell>
                    <TableCell>{timesheet?.hours}</TableCell>
                    <TableCell>{timesheet.billed_hours}</TableCell>
                    <TableCell>{timesheet.ok_hours}</TableCell>
                    <TableCell>{timesheet.blank_hours}</TableCell>
                    <TableCell>{timesheet.day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{marginTop: 2, display: "flex", justifyContent: "center"}}
        />
      </Paper>
    </Layout>
  );
};

export default ManagerTimesheet;
