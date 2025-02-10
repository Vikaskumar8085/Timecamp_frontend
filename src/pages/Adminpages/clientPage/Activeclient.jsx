import React, {useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {fetchactiveclientapicall} from "../../../ApiServices/AdminApiServices/Client";
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
import {Link} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import Empty from "../../../common/EmptyFolder/Empty";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";

const Activeclient = () => {
  const [isactiveclientdata, setIsactiveclientdata] = useState([]);

  const getactiveclient = async () => {
    try {
      const response = await fetchactiveclientapicall();
      if (response.success) {
        setIsactiveclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    getactiveclient();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Active Client" />
      <ClientTable Isclientdata={isactiveclientdata} />
    </Layout>
  );
};

export default Activeclient;
