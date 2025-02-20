import React, { useEffect, useState } from "react";
import { fetchcontractoractiveprojectapicall } from "../../ApiServices/ContractorApiServices/ContractorApiServices";

const ContractorInactiveProject = () => {
  const [isContractoractiveprojectdata, setIscontractoractiveprojectdata] =
    useState([]);
  const fetchcontractoractiveprojectfunc = async () => {
    try {
      const response = await fetchcontractoractiveprojectapicall();
      if (response.success) {
        setIscontractoractiveprojectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchcontractoractiveprojectfunc();
  }, [0]);
  return <div></div>;
};

export default ContractorInactiveProject;
