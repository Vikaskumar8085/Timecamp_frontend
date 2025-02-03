import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {fetchsinglecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import Card from "../../../common/Card/Card";

const ContractorInfo = () => {
  const {id} = useParams();

  const [isContractordata, setIscontractordata] = useState([]);

  const getcontractorInfo = async () => {
    try {
      const response = await fetchsinglecontractorapicall(id);
      console.log(response);
      if (response.success) {
        setIscontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getcontractorInfo();
  }, [0]);
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Contractor Info" />
      <Card>
        <p>FirstName:{isContractordata.FirstName}</p>
        <p>LastName:{isContractordata.LastName}</p>
        <p>Email:{isContractordata.Email}</p>
        <p>Phone:{isContractordata.Phone}</p>
        <p>Address:{isContractordata.Address}</p>
      </Card>
    </DefaultLayout>
  );
};

export default ContractorInfo;
