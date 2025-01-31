import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import { fetchsinglecontractorapicall } from "../../../ApiServices/AdminApiServices/Contractor";

const ContractorInfo = () => {
  const { id } = useParams();

  const getcontractorInfo = async () => {
    try {
      const response = await fetchsinglecontractorapicall(id);
      console.log(response);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getcontractorInfo();
  },[0]);
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Contractor Info" />
    </DefaultLayout>
  );
};

export default ContractorInfo;
