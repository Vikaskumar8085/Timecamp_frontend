import React, {useEffect, useState} from "react";
import {fetchactivecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import ContractorTable from "../../../Component/AdminComponents/Contractor/ContractorTable";

const Activecontractor = () => {
  const [isActivecontractordata, setIsActivecontractordata] = useState([]);

  const getactivecontractor = async () => {
    try {
      const response = await fetchactivecontractorapicall();
      if (response.success) {
        setIsActivecontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactivecontractor();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Active Contractor" />
      <ContractorTable Iscontractordata={isActivecontractordata} />
    </Layout>
  );
};

export default Activecontractor;
