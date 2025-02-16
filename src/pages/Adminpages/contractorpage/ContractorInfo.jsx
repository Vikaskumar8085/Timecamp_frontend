import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchsinglecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import TabComp from "../../../common/TabComponent/TabComp";
import ContractorInformation from "./ContractorInfopage/ContractorInformation";

const ContractorInfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);
  const [isContractordata, setIscontractordata] = useState([]);

  console.log(isContractordata)
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

  const tabsheader = [{title: "Contractor Info"}, {title: "TimeSheet"}];
  const Tabsbody = [
    {
      content: (
        <>
          <ContractorInformation isContractordata={isContractordata}/>
        </>
      ),
    },
    {
      content: <></>,
    },
  ];
  return (
    <Layout>
      <BreadCrumb pageName="Contractor Info" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </Layout>
  );
};

export default ContractorInfo;
