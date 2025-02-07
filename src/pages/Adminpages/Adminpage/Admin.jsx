// import React from "react";
// import axios from "axios";
// import ApexCharts from "react-apexcharts";
// import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";

// const Admin = () => {
//   const [chartData, setChartData] = React.useState(null);
//   const [chartOptions, setChartOptions] = React.useState({
//     chart: {
//       id: "salary-chart",
//     },
//     xaxis: {
//       categories: [],
//     },
//   });

//   //   // Fetch data from the backend
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

//   return (
//     <DefaultLayout>
//       <h2>Salary Data Chart</h2>
//       <ApexCharts
//         options={chartData.options}
//         series={chartData.series}
//         type="bar"
//         height={350}
//       />
//     </DefaultLayout>
//   );
// };

// export default Admin;

import React, { useEffect } from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import { Button, Drawer } from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import AdminForm from "../../../Component/AdminComponents/Admin/AdminForm";
import AdminTable from "../../../Component/AdminComponents/Admin/AdminTable";
import {
  createadminapicall,
  fetchadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAdmindata, setIsAdmindata] = React.useState([]);

  // fetch admin

  const fetchadmin = async () => {
    try {
      const response = await fetchadminapicall();

      if (response.success) {
        setIsAdmindata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // create admin
  const handleSubmit = async (value) => {
    try {
      const response = await createadminapicall(value);

      if (response.success) {
        getalladmin();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error?.message);
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    fetchadmin();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Admin" />
      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "0px 10px",
            color: "white",
          }}
        >
          Add Admin
        </Button>
      </HeaderTab>
      {isModalOpen ? (
        <Drawer
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // title={"Add Admin"}
          anchor="right"
        >
          <AdminForm handleSubmit={handleSubmit} />
        </Drawer>
      ) : null}

      <AdminTable isAdmindata={isAdmindata} />
    </Layout>
  );
};

export default Admin;
