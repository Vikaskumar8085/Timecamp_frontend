import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {fetchactiveemployeeapicall} from "../../../ApiServices/AdminApiServices/Employee";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import EmployeeTable from "../../../Component/AdminComponents/Employee/EmployeeTable";

const ActiveEmployee = () => {
  const [IsactiveEmployeedata, setIsactiveEmployeedata] = useState([]);
  const getactiveemployee = async () => {
    try {
      const response = await fetchactiveemployeeapicall();
      if (response.success) {
        setIsactiveEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactiveemployee();
  }, [0]);

  return (
    <>
      <Layout>
        <BreadCrumb pageName="Active Employee" />
        <EmployeeTable IsEmployeeData={IsactiveEmployeedata} />
      </Layout>
    </>
  );
};

export default ActiveEmployee;
