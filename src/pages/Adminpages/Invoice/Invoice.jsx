import React from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const Invoice = () => {
  return (
    <Layout>
      <BreadCrumb pageName="Invoice" />
      <Button startIcon={<AddIcon />}>Create Invoice</Button>
    </Layout>
  );
};

export default Invoice;
