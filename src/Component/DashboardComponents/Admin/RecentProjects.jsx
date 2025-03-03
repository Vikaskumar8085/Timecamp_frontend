import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import apiInstance from "../../../ApiInstance/apiInstance";
const RecentProjects = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });
  const fetchProjects = async () => {
    try {
      const {data} = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-recent-project"
      );
      if (data.success) {
        const categories = data.result.map((project) => project.Project_Name);

        const startDates = data.result.map((project) => ({
          x: project.Project_Name,
          y: moment(project.Start_Date).valueOf(), // Convert to timestamp
        }));

        const endDates = data.result.map((project) => ({
          x: project.Project_Name,
          y: moment(project.End_Date).valueOf(), // Convert to timestamp
        }));
        setChartData({
          categories,
          series: [
            {name: "Start Date", data: startDates},
            {name: "End Date", data: endDates},
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [0]);
  const chartOptions = {
    chart: {type: "line", height: 350},
    xaxis: {categories: chartData.categories},
    yaxis: {
      labels: {
        formatter: (val) => moment(val).format("DD MMM YYYY"), // Format using Moment.js
      },
    },
    tooltip: {
      y: {
        formatter: (val) => moment(val).format("DD MMM YYYY"), // Format in tooltip
      },
    },
  };

  return (
    <Box sx={{my: 2}}>
      <Typography>
        <strong>Recent Project</strong>
      </Typography>

      <div>
        <ApexCharts
          options={chartOptions}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </Box>
  );
};

export default RecentProjects;
