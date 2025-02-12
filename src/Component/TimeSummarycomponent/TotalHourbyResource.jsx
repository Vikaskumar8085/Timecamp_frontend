import React from "react";
import Chart from "react-apexcharts";

const TotalHourbyResource = () => {
  //   const [chartData, setChartData] = React.useState(null);
  //   const [chartOptions, setChartOptions] = React.useState({
  //     chart: {
  //       id: "salary-chart",
  //     },
  //     xaxis: {
  //       categories: [],
  //     },
  //   });
  // Sample data
  const chartData = {
    series: [
      {
        name: "Total Hours",
        data: [150, 200, 180, 220, 140], // Replace with actual values
      },
      {
        name: "Billed Hours",
        data: [120, 180, 160, 200, 130], // Replace with actual values
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: ["Alice", "Bob", "Charlie", "David", "Eve"], // Replace with resourcesName
        title: {
          text: "Resources",
        },
      },
      yaxis: {
        title: {
          text: "Hours",
        },
      },
      colors: ["#008FFB", "#FF4560"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
      },
    },
  };

  //   // Fetch data from the backend
  //   React.useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/chart-data")
  //       .then((response) => {
  //         const data = response.data;

  //         // Prepare categories (labels) and series data for ApexCharts
  //         const categories = data.map((item) => item.label);
  //         const salaryData = data.map((item) => ({
  //           name: item.label,
  //           data: [item.startSalary, item.endSalary], // Two data points per label (startSalary and endSalary)
  //         }));

  //         setChartData({
  //           series: salaryData,
  //           options: {
  //             ...chartOptions,
  //             xaxis: {
  //               categories: categories,
  //             },
  //           },
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching chart data", error);
  //       });
  //   }, []); // Empty dependency array to fetch data once

  //   //   // If chart data is not yet available
  //   if (!chartData) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default TotalHourbyResource;
