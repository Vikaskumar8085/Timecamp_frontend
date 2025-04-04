import React, {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchemployeeprojectinformationapicall} from "../../../ApiServices/EmployeeApiservices/Employee";
import apiInstance from "../../../ApiInstance/apiInstance";

import Chart from "react-apexcharts";
const EmployeeProjectInformation = ({id}) => {
  const [
    IsEmployeeProjectInformationdata,
    setIsEmployeeProjectInformationdata,
  ] = useState([]);

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployeeprojectinfofunc = async () => {
    try {
      const response = await fetchemployeeprojectinformationapicall(id);
      if (response.success) {
        setIsEmployeeProjectInformationdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchemployeeesingleprojectchartfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-single-project-info-chart/${id}`
      );
      if (response.data.success) {
        const result = response.data.result;

        setChartData([
          {
            x: result.ProjectName,
            y: [
              new Date(result.Start_Date).getTime(),
              new Date(result.End_Date).getTime(),
            ],
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching contractor chart data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeprojectinfofunc();
  }, [0]);
  useEffect(() => {
    fetchemployeeesingleprojectchartfunc();
  }, [id]);

  const options = {
    chart: {
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      type: "datetime",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const start = new Date(val[0]);
        const end = new Date(val[1]);
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      },
    },
  };

  const series = [
    {
      name: "Project Duration",
      data: chartData || [],
    },
  ];

  const content = IsEmployeeProjectInformationdata.map((project, index) => {
    return (
      <>
        <Card sx={{maxWidth: 600, m: 2, p: 2, boxShadow: 3, borderRadius: 2}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {project.Project_Name} ({project.Project_Code})
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Type: {project.Project_Type}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Manager:</strong> {project.Manager_Name}
            </Typography>

            <Typography variant="body1">
              <strong>Project Hours:</strong> {project.Project_Hours} hrs
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong>{" "}
              {project.Project_Status ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body1">
              <strong>Start Date:</strong> {project.Start_Date}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong> {project.End_Date}
            </Typography>

            <Box mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Team Members:
              </Typography>
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                {project.Team.map((member, index) => (
                  <Chip
                    key={index}
                    label={member}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  });

  return (
    <>
      <BreadCrumb pageName="Employee Project Information" />
      {content}
      {loading ? (
        <CircularProgress />
      ) : (
        <Chart options={options} series={series} type="rangeBar" height={200} />
      )}
    </>
  );
};

export default EmployeeProjectInformation;
