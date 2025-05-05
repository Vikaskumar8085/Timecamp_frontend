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

import React, {useEffect} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Container, Drawer, Button, Grid2} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import AdminForm from "../../../Component/AdminComponents/Admin/AdminForm";
import AdminTable from "../../../Component/AdminComponents/Admin/AdminTable";
import {
  createadminapicall,
  fetchadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import UserList from "../../../Component/AdminComponents/Admin/UserList";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import Input from "../../../common/Input/Input";
import toast from "react-hot-toast";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";
import InputPassword from "../../../common/InputPassword/InputPassword";
import PhoneInput from "react-phone-input-2";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAdmindata, setIsAdmindata] = React.useState([]);
  const [IsEdit, setIsEdit] = React.useState(null);
  const dispatch = useDispatch();
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

  const handleEdit = (value) => {
    setIsEdit(value);
    setIsModalOpen(true);
  };
  // create admin
  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createadminapicall(value);

      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);

        fetchadmin();
        setIsModalOpen(false);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    fetchadmin();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Admin" />
      <Button
        onClick={() => setIsModalOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Add Admin
      </Button>
      {/* {isModalOpen ? (
          <TModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // title={"Add Admin"}
            title={"add Admin"}
          >
            <AdminForm
              IsEdit={IsEdit}
              setIsEdit={setIsEdit}
              handleSubmit={handleSubmit}
            />
        </TModal>
      ) : null} */}
      {isModalOpen && (
        <>
          <TModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={"add Admin"}
          >
            <Container maxWidth={"lg"}>
              <form>
                <Grid2 Container spacing={4}>
                  <Grid2 size={{sm: 12, md: 6, xs: 12}} sx={{mt: 3}}>
                    <Input
                      style={{width: "100%"}}
                      placeholder={"Please Enter Your First Name"}
                      labelText={"First Name"}
                    />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                    <Input
                      style={{width: "100%"}}
                      placeholder={"please Enter Your Last Name"}
                      labelText={"LastName"}
                    />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                    <Input
                      style={{width: "100%"}}
                      type={"Email"}
                      placeholder={"please Enter Your Last Name"}
                      labelText={"Email"}
                    />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                    <InputPassword
                      type={"password"}
                      labelText={"Password"}
                      style={{width: "100%"}}
                    />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                    <label
                      htmlFor="phone-input"
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: "#86919b",
                        fontWeight: "500",
                      }}
                    >
                      Phone Number
                    </label>

                    <PhoneInput
                      inputStyle={{width: "100%"}}
                      country={"in"}
                      style={{width: "100%"}}
                    />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                    <InputFileupload />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                    <Button
                      type="submit"
                      sx={{
                        background: "#6560f0",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      submit
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </Container>
          </TModal>
        </>
      )}

      <UserList handleEdit={handleEdit} users={isAdmindata} />
    </LayoutDesign>
  );
};

export default Admin;
