import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";

const ContractorInfo = () => {
  const { id } = useParams();

  const getcontractorInfo = async () => {
    try {
      // const reponse = await
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(()=>{
    
  })
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Contractor Info" />
    </DefaultLayout>
  );
};

export default ContractorInfo;
