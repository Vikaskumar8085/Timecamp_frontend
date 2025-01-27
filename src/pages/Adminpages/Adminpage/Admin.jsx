import React from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const Admin = () => {
  const [chartData, setChartData] = React.useState(null);
  const [chartOptions, setChartOptions] = React.useState({
    chart: {
      id: "salary-chart",
    },
    xaxis: {
      categories: [],
    },
  });

  //   // Fetch data from the backend
  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/chart-data")
      .then((response) => {
        const data = response.data;

        // Prepare categories (labels) and series data for ApexCharts
        const categories = data.map((item) => item.label);
        const salaryData = data.map((item) => ({
          name: item.label,
          data: [item.startSalary, item.endSalary], // Two data points per label (startSalary and endSalary)
        }));

        setChartData({
          series: salaryData,
          options: {
            ...chartOptions,
            xaxis: {
              categories: categories,
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching chart data", error);
      });
  }, []); // Empty dependency array to fetch data once

  //   // If chart data is not yet available
  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Salary Data Chart</h2>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Admin;
