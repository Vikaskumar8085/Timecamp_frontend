import React, {useEffect, useState} from "react";
import {fetchinactivecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import ContractorTable from "../../../Component/AdminComponents/Contractor/ContractorTable";

const InActivecontractor = () => {
  const [isInActivecontractordata, setIsInActivecontractordata] = useState([]);

  const getInactivecontractor = async () => {
    try {
      const response = await fetchinactivecontractorapicall();
      if (response.success) {
        setIsInActivecontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getInactivecontractor();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="InActive contractor" />
      <ContractorTable Iscontractordata={isInActivecontractordata} />
    </Layout>
  );
};

export default InActivecontractor;
