import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  fetchcontractorprojectapicall,
  fetchsinglecontractorapicall,
} from "../../../ApiServices/AdminApiServices/Contractor";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import TabComp from "../../../common/TabComponent/TabComp";
import ContractorInformation from "./ContractorInfopage/ContractorInformation";

const ContractorInfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);
  const [isContractordata, setIscontractordata] = useState([]);
  const [iscontractorprojectdata, setIscontractorprojectdata] = useState([]);

  console.log(isContractordata);

  const fetchcontractorprojectfunc = async () => {
    try {
      const response = await fetchcontractorprojectapicall(id);
      if (response.success) {
        setIscontractorprojectdata(response.result);
      }
    } catch (error) {}
  };
  const getcontractorInfo = async () => {
    try {
      const response = await fetchsinglecontractorapicall(id);
      console.log(response);
      if (response.success) {
        setIscontractordata(response.result);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getcontractorInfo();
    fetchcontractorprojectfunc();
  }, [0]);

  const tabsheader = [{title: "Contractor Info"}, {title: "TimeSheet"}];
  const Tabsbody = [
    {
      content: (
        <>
          <ContractorInformation
            isContractordata={isContractordata}
            iscontractorprojectdata={iscontractorprojectdata}
          />
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
