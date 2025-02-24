import React from "react";
import {useParams} from "react-router-dom";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";

const ManagerProjectInfo = () => {
  const {id} = useParams();
  return (
    <Layout>
      <BreadCrumb pageName="ManagerProjectActive" />
    </Layout>
  );
};

export default ManagerProjectInfo;
