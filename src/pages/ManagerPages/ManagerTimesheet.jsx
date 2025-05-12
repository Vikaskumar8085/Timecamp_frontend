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
  Grid,
  Card,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListIcon from "@mui/icons-material/List";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
const ManagerTimesheet = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const stats = [
    {
      label: "Total Hours",
      value: timesheets.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: timesheets.length,
      icon: <ListIcon color="secondary" />,
    },
    {
      label: "Total Billed Hours",
      value: timesheets.reduce(
        (sum, item) => sum + (item.billed_hours || 0),
        0
      ),
      icon: <ReceiptIcon color="success" />,
    },
    {
      label: "Total OK Hours",
      value: timesheets.reduce((sum, item) => sum + (item.ok_hours || 0), 0),
      icon: <CheckCircleIcon color="primary" />,
    },
  ];

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
    <LayoutDesign>
      <BreadCrumb pageName="Manager Timesheet" />

      <Grid container spacing={2} sx={{my: 1}}>
        {stats.map((stat, index) => (
          <Grid item sm={12} md={3} lg={3} key={index}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {stat.icon}
              <Typography variant="h6">
                {stat.label}: {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{padding: 2, margin: "auto"}}>
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
    </LayoutDesign>
  );
};

export default ManagerTimesheet;
