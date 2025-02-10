import React, {useEffect, useState} from "react";
import {fetchdeadclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";

const Deadclient = () => {
  const [isdeadclientdata, setIsdeadclientdata] = useState([]);

  const getdeadclient = async () => {
    try {
      const response = await fetchdeadclientapicall();
      if (response.success) {
        setIsdeadclientdata(response.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdeadclient();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Dead Client" />
      <ClientTable Isclientdata={isdeadclientdata} />
    </Layout>
  );
};

export default Deadclient;
