import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import { Button } from "@mui/material";

const ManagerTimesheet = () => {
  return (
    <Layout>
      <BreadCrumb pageName="ManagerTimesheet" />
      <Button>upload Timesheet</Button>
    </Layout>
  );
};

export default ManagerTimesheet;
