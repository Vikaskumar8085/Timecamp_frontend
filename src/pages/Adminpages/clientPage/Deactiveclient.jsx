import React, {useEffect, useState} from "react";
import {fetchinactiveclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";

const Deactiveclient = () => {
  const [isInactiveclientdata, setIsinactiveclientdata] = useState([]);

  const getinactiveclient = async () => {
    try {
      const response = await fetchinactiveclientapicall();
      console.log(response);
      if (response.success) {
        setIsinactiveclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getinactiveclient();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="InActive Client" />
      <ClientTable Isclientdata={isInactiveclientdata} />
    </Layout>
  );
};

export default Deactiveclient;
